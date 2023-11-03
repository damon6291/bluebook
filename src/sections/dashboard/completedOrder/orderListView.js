import { useState, useCallback, useEffect } from "react";
import { sub } from "date-fns";
// @mui
import { alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
// routes
import { PATHS } from "src/constants/routeConstants";
import { useRouter } from "src/routes/hook";
// utils
import { fTimestamp } from "src/utils/format-time";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { ConfirmDialog } from "src/components/custom-dialog";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "src/components/table";
//
import OrderTableRow from "src/sections/dashboard/common/order/order-table-row";
import OrderTableToolbar from "src/sections/dashboard/common/order/order-table-toolbar";
import OrderTableFiltersResult from "src/sections/dashboard/common/order/order-table-filters-result";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/custom-breadcrumbs";
import dashboardStore from "src/store/dashboardStore";
import loadingStore from "src/store/loadingStore";

// ----------------------------------------------------------------------

const ITEMS = [...Array(3)].map((_, index) => ({
  id: index,
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: `product${index}`,
  //   coverUrl: _mock.image.product(index),
  price: 100,
}));

export const _orders = [...Array(20)].map((_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items =
    (index % 2 && ITEMS.slice(0, 1)) ||
    (index % 3 && ITEMS.slice(1, 3)) ||
    ITEMS;

  const totalQuantity = items.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  const subTotal = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const totalAmount = subTotal - shipping - discount + taxes;

  const customer = {
    id: index,
    name: "damon",
    email: "email.com",

    ipAddress: "192.158.1.38",
  };

  const delivery = {
    shipBy: "DHL",
    speedy: "Standard",
    trackingNumber: "SPX037739199373",
  };

  const history = {
    timeline: [
      {
        title: "Delivery successful",
        time: sub(new Date(), { days: 1, hours: 1 }),
      },
      {
        title: "Transporting to [2]",
        time: sub(new Date(), { days: 2, hours: 2 }),
      },
      {
        title: "Transporting to [1]",
        time: sub(new Date(), { days: 3, hours: 3 }),
      },
      {
        title: "The shipping unit has picked up the goods",
        time: sub(new Date(), { days: 4, hours: 4 }),
      },
      {
        title: "Order has been created",
        time: sub(new Date(), { days: 5, hours: 5 }),
      },
    ],
  };

  return {
    id: index,
    createdAt: sub(new Date(), { days: index, hours: index }),
    orderName: "orderName",
    items,
    history,
    delivery,
    totalAmount,
    totalQuantity,
    shippingAddress: {
      fullName: "damon Joung",
      fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
      phoneNumber: "365-374-4961",
    },
    payment: {
      cardType: "mastercard",
      cardNumber: "**** **** **** 5678",
    },
    status:
      (index % 2 && "completed") ||
      (index % 3 && "pending") ||
      (index % 4 && "cancelled") ||
      "completed",
  };
});

export const ORDER_STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  ...ORDER_STATUS_OPTIONS,
];

const TABLE_HEAD = [
  { id: "id", label: "Order", width: 116 },
  { id: "orderName", label: "Order Name" },
  { id: "createdAt", label: "Date", width: 140 },
  { id: "totalQuantity", label: "Items", width: 120, align: "center" },
  { id: "totalAmount", label: "Price", width: 140 },
  { id: "status", label: "Status", width: 110 },
  { id: "", width: 88 },
];

const defaultFilters = {
  name: "",
  status: "all",
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function OrderListView() {
  const table = useTable({
    defaultOrderBy: "id",
    defaultOrder: "desc",
  });

  const router = useRouter();

  const confirm = useBoolean();

  const { completedOrders: orders, setCompletedOrders } = dashboardStore();
  const { setIsLoading } = loadingStore();

  const [tableData, setTableData] = useState(orders);

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    (async () => {
      if (orders.length == 0) {
        setIsLoading(true);
        await setCompletedOrders();
        setIsLoading(false);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset =
    !!filters.name ||
    filters.status !== "all" ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATHS.order(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters("status", newValue);
    },
    [handleFilters]
  );

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Completed Orders"
          links={[
            { name: "Dashboard", href: PATHS.dashboard },
            {
              name: "Completed Orders",
            },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === "all" || tab.value === filters.status) &&
                        "filled") ||
                      "soft"
                    }
                    color={
                      (tab.value === "completed" && "success") ||
                      (tab.value === "cancelled" && "error") ||
                      "default"
                    }
                  >
                    {tab.value === "all" && orders.length}
                    {tab.value === "completed" &&
                      orders.filter((order) => order.status === "completed")
                        .length}

                    {tab.value === "cancelled" &&
                      orders.filter((order) => order.status === "cancelled")
                        .length}
                    {tab.value === "refunded" &&
                      orders.filter((order) => order.status === "refunded")
                        .length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <OrderTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            canReset={canReset}
            onResetFilters={handleResetFilters}
          />

          {canReset && (
            <OrderTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <Scrollbar>
              <Table sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      tableData.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete{" "}
            <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  console.log(inputData);

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.id.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.orderName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== "all") {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          fTimestamp(order.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(order.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
