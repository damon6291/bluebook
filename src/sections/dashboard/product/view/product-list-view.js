import isEqual from "lodash/isEqual";
import { useState, useEffect, useCallback } from "react";
// @mui
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
import { RouterLink } from "src/routes/components";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// components
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "src/components/table";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import ProductTableRow from "../product-table-row";
import ProductTableToolbar from "../product-table-toolbar";
import ProductTableFiltersResult from "../product-table-filters-result";
import productStore from "src/store/productStore";
import {
  PRODUCT_STOCK_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  PUBLISH_OPTIONS,
} from "src/constants/productConstants";
import loadingStore from "src/store/loadingStore";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Product" },
  { id: "createdAt", label: "Create at", width: 160 },
  { id: "price", label: "Price", width: 140 },
  { id: "bestSeller", label: "Best Seller", width: 160 },
  { id: "publish", label: "Publish", width: 110 },
  { id: "", width: 88 },
];

const defaultFilters = {
  name: "",
  publish: [],
  category: [],
};

// ----------------------------------------------------------------------

export default function ProductListView() {
  const router = useRouter();

  const table = useTable();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const { products, getProducts, deleteProduct } = productStore();
  const { setIsLoading } = loadingStore();

  const loading = useBoolean();

  const confirm = useBoolean();

  useEffect(() => {
    (async () => {
      loading.onTrue();
      await getProducts();
      loading.onFalse();
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || products.length == 0;

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
    async (id) => {
      console.log("deleteid", id);
      setIsLoading(true);
      try {
        var res = await deleteProduct(id);
        if (!res) toast.error("Error Deleting Product");
      } catch (err) {
        toast.error("Error Deleting Product");
      } finally {
        setIsLoading(false);
      }
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

  const handleEditRow = useCallback(
    (id) => {
      router.push(PATHS.productEdit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATHS.productEdit(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Tests"
          links={[
            { name: "Dashboard", href: PATHS.dashboard },
            {
              name: "Tests",
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={PATHS.dashboardTestsAdd}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Test
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            categoryOptions={PRODUCT_CATEGORY_GROUP_OPTIONS}
            stockOptions={PRODUCT_STOCK_OPTIONS}
            publishOptions={PUBLISH_OPTIONS}
          />

          {canReset && (
            <ProductTableFiltersResult
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
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 960 }}
              >
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {loading.value ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <ProductTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                          />
                        ))}
                    </>
                  )}

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
            //
            // dense={table.dense}
            // onChangeDense={table.onChangeDense}
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

function applyFilter({ inputData, comparator, filters }) {
  const { name, category, publish } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (category.length) {
    inputData = inputData.filter((product) =>
      category.includes(product.category)
    );
  }

  if (publish.length) {
    console.log(inputData, publish);
    var options = [];
    PUBLISH_OPTIONS.map((x) => {
      if (publish.includes(x.label)) {
        options.push(x.value);
      }
    });
    inputData = inputData.filter((product) =>
      options.includes(product.publish)
    );
  }

  return inputData;
}
