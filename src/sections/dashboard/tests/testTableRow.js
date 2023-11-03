import PropTypes from "prop-types";
import { format } from "date-fns";
// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
// utils
import { fCurrency } from "src/utils/format-number";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function TestTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const {
    name,

    publish,

    category,

    createdAt,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <ListItemText
            // disableTypography
            primary={
              <Link
                // noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: "pointer" }}
              >
                {name}
              </Link>
            }
            // secondary={
            //   <Box
            //     component="div"
            //     sx={{ typography: "body2", color: "text.disabled" }}
            //   >
            //     {category}
            //   </Box>
            // }
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={category}
            primaryTypographyProps={{ typography: "body2", noWrap: true }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(createdAt), "dd MMM yyyy")}
            secondary={format(new Date(createdAt), "p")}
            primaryTypographyProps={{ typography: "body2", noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: "span",
              typography: "caption",
            }}
          />
        </TableCell>

        {/* <TableCell>
          <Stack direction={"row"} spacing={0.5}>
            <Typography
              sx={{ textDecoration: priceSale ? "line-through" : "none" }}
            >
              {fCurrency(price)}
            </Typography>
            <Typography sx={{ display: priceSale ? "block" : "none" }}>
              /
            </Typography>
            <Typography>{fCurrency(priceSale)}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={bestSeller ? "info" : "warning"}>
            {bestSeller ? "Yes" : "No"}
          </Label>
        </TableCell> */}

        <TableCell>
          <Label variant="soft" color={publish ? "info" : "warning"}>
            {publish ? "Published" : "Hidden"}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton
            color={popover.open ? "primary" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          Details
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

TestTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
