import PropTypes from "prop-types";
// @mui
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// routes
import { PATHS } from "src/constants/routeConstants";
import { RouterLink } from "src/routes/components";
// utils
import { fCurrency } from "src/utils/format-number";
// components
import Label from "src/components/label";
import Image from "src/components/image";
import Iconify from "src/components/iconify";
import checkoutStore from "src/store/checkoutStore";
import { toast } from "react-toastify";
//

// ----------------------------------------------------------------------

export default function ProductItem({ product }) {
  const {
    id,
    name,
    description,
    images,
    price,
    priceSale,
    saleLabel,
    newLabel,
  } = product;

  const { addProductToCart } = checkoutStore();

  const linkTo = PATHS.product(id);

  const handleAddCart = async () => {
    try {
      // onAddToCart(newProduct);
      addProductToCart({ ...product, quantity: 1 });
      toast.success("Product has been added");
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = (saleLabel.length > 0 || newLabel.length > 0) && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: "absolute", zIndex: 9, top: 16, right: 16 }}
    >
      {newLabel.length > 0 && (
        <Label variant="filled" color="info">
          {newLabel}
        </Label>
      )}
      {saleLabel.length > 0 && (
        <Label variant="filled" color="error">
          {saleLabel}
        </Label>
      )}
    </Stack>
  );

  const renderImg = (
    <Box sx={{ position: "relative", p: 1 }}>
      {/* {!!available && ( */}
      <Fab
        color="warning"
        size="medium"
        className="add-cart-btn"
        onClick={handleAddCart}
        sx={{
          right: 16,
          bottom: 16,
          zIndex: 9,
          opacity: 0,
          position: "absolute",
          transition: (theme) =>
            theme.transitions.create("all", {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        <Iconify icon="solar:cart-plus-bold" width={24} />
      </Fab>
      {/* )} */}

      {/* <Tooltip title={!available && "Out of stock"} placement="bottom-end"> */}
      <Tooltip placement="bottom-end">
        <Image
          alt={name}
          src={images[0]}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            // ...(!available && {
            //   opacity: 0.48,
            //   filter: "grayscale(1)",
            // }),
          }}
          component={RouterLink}
          href={linkTo}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={linkTo}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        {name}
      </Link>

      <Stack
        direction="row-reverse"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={0.5} sx={{ typography: "subtitle1" }}>
          {priceSale && priceSale > 0 ? (
            <>
              <Box
                component="span"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                }}
              >
                {fCurrency(price)}
              </Box>
              <Box component="span">{fCurrency(priceSale)}</Box>
            </>
          ) : (
            <Box component="span">{fCurrency(price)}</Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
        "&:hover .add-cart-btn": {
          opacity: 1,
        },
      }}
    >
      {renderLabels}
      {renderImg}
      {renderContent}
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};
