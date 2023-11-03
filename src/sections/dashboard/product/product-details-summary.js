import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
// routes
import { PATHS } from "src/constants/routeConstants";
import { useRouter } from "src/routes/hook";
// utils
import { fShortenNumber, fCurrency } from "src/utils/format-number";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { ColorPicker } from "src/components/color-utils";
import FormProvider, { RHFSelect } from "src/components/hook-form";
//
import IncrementerButton from "./common/incrementer-button";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();

  const {
    id,
    name,
    // sizes,
    price,
    // coverUrl,
    images,
    // colors,
    newLabel,
    // available,
    priceSale,
    saleLabel,
    // totalRatings,
    // totalReviews,
    // inventoryType,
    subDescription,
  } = product;

  const existProduct =
    !!items?.length && items.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   !!items?.length &&
  //   items.filter((item) => item.id === id).map((item) => item.quantity)[0] >=
  //     available;

  const defaultValues = {
    id,
    name,
    coverUrl: images[0],
    // available,
    price,
    // colors: colors[0],
    // size: sizes[4],
    quantity: 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...product,
          quantity: values.quantity,
          // subTotal: values.price * values.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(PATHS.shoppingCart);
    } catch (error) {
      toast.error("There is an error");
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...product,
        quantity: values.quantity,
        // subTotal: values.price * values.quantity,
      });
      toast.success("Product has been added");
    } catch (error) {
      toast.error("There is an error");
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: "h5" }}>
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
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  // const renderColorOptions = (
  //   <Stack direction="row">
  //     <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
  //       Color
  //     </Typography>

  //     <Controller
  //       name="colors"
  //       control={control}
  //       render={({ field }) => (
  //         <ColorPicker
  //           colors={colors}
  //           selected={field.value}
  //           onSelectColor={(color) => field.onChange(color)}
  //           limit={4}
  //         />
  //       )}
  //     />
  //   </Stack>
  // );

  // const renderSizeOptions = (
  //   <Stack direction="row">
  //     <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
  //       Size
  //     </Typography>

  //     <RHFSelect
  //       name="size"
  //       size="small"
  //       helperText={
  //         <Link underline="always" color="textPrimary">
  //           Size Chart
  //         </Link>
  //       }
  //       sx={{
  //         maxWidth: 88,
  //         [`& .${formHelperTextClasses.root}`]: {
  //           mx: 0,
  //           mt: 1,
  //           textAlign: "right",
  //         },
  //       }}
  //     >
  //       {sizes.map((size) => (
  //         <MenuItem key={size} value={size}>
  //           {size}
  //         </MenuItem>
  //       ))}
  //     </RHFSelect>
  //   </Stack>
  // );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= 10}
          onIncrease={() => setValue("quantity", values.quantity + 1)}
          onDecrease={() => setValue("quantity", values.quantity - 1)}
        />

        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: "right" }}
        >
          Available: {10}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: "nowrap" }}
      >
        Add to Cart
      </Button>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={disabledActions}
      >
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {subDescription}
    </Typography>
  );

  // const renderRating = (
  //   <Stack
  //     direction="row"
  //     alignItems="center"
  //     sx={{
  //       color: "text.disabled",
  //       typography: "body2",
  //     }}
  //   >
  //     <Rating
  //       size="small"
  //       value={totalRatings}
  //       precision={0.1}
  //       readOnly
  //       sx={{ mr: 1 }}
  //     />
  //     {`(${fShortenNumber(totalReviews)} reviews)`}
  //   </Stack>
  // );

  const renderLabels = (newLabel.length > 0 || saleLabel.length > 0) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.length > 0 && <Label color="info">{newLabel}</Label>}
      {saleLabel.length > 0 && <Label color="error">{saleLabel}</Label>}
    </Stack>
  );

  // const renderInventoryType = (
  //   <Box
  //     component="span"
  //     sx={{
  //       typography: "overline",
  //       color:
  //         (inventoryType === "out of stock" && "error.main") ||
  //         (inventoryType === "low stock" && "warning.main") ||
  //         "success.main",
  //     }}
  //   >
  //     {inventoryType}
  //   </Box>
  // );

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      style={{ height: "100%" }}
    >
      <Stack
        spacing={3}
        sx={{ pt: 3, height: "80%" }}
        {...other}
        justifyContent={"space-between"}
      >
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {/* {renderInventoryType} */}

          <Typography variant="h5">{name}</Typography>

          {/* {renderRating} */}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* {renderColorOptions} */}

        {/* {renderSizeOptions} */}

        {renderQuantity}

        <Divider sx={{ borderStyle: "dashed" }} />

        {renderActions}

        {/* {renderShare} */}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  items: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
