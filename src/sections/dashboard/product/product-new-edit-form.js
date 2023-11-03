import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
// routes
import { PATHS } from "src/constants/routeConstants";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// _mock
// import {
//   _tags,
//   PRODUCT_SIZE_OPTIONS,
//   PRODUCT_GENDER_OPTIONS,
//   PRODUCT_COLOR_NAME_OPTIONS,
//   PRODUCT_CATEGORY_GROUP_OPTIONS,
// } from "src/_mock";
// components
import { useRouter } from "src/routes/hook";
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFSingleSelect,
} from "src/components/hook-form";
import { toast } from "react-toastify";

import { PRODUCT_CATEGORY_GROUP_OPTIONS } from "src/constants/productConstants";
import productStore from "src/store/productStore";
import loadingStore from "src/store/loadingStore";

// ----------------------------------------------------------------------
export default function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const mdUp = useResponsive("up", "md");

  const { setIsLoading } = loadingStore();

  const { saveProduct } = productStore();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  let patternTwoDigitsAfterComma = /^\d+(\.\d{0,2})?$/;

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    images: Yup.array().min(1, "Images is required"),
    // tags: Yup.array().min(2, "Must have at least 2 tags"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .moreThan(0, "Price should not be $0.00")
      .test(
        "is-decimal",
        "The amount should have maximum two digits after comma",
        (val) =>
          val != undefined ? patternTwoDigitsAfterComma.test(val) : true
      ),
    priceSale: Yup.number().test(
      "is-decimal",
      "The amount should have maximum two digits after comma",
      (val) => (val != undefined ? patternTwoDigitsAfterComma.test(val) : true)
    ),
    description: Yup.string().required("Description is required"),
    // not required
    taxes: Yup.number(),
    newLabel: Yup.string(),
    saleLabel: Yup.string(),
    publish: Yup.boolean(),
    bestSeller: Yup.boolean(),

    // newLabel: Yup.object().shape({
    //   enabled: Yup.boolean(),
    //   content: Yup.string(),
    // }),
    // saleLabel: Yup.object().shape({
    //   enabled: Yup.boolean(),
    //   content: Yup.string(),
    // }),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentProduct?.id || 0,
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      subDescription: currentProduct?.subDescription || "",
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || "",
      // sku: currentProduct?.sku || "",
      price: currentProduct?.price || 0,
      // quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      // tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      // gender: currentProduct?.gender || "",
      category: currentProduct?.category || "",
      // colors: currentProduct?.colors || [],
      // sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || "",
      saleLabel: currentProduct?.saleLabel || "",
      publish: currentProduct?.publish ?? true,
      bestSeller: currentProduct?.bestSeller ?? false,
      createdAt: currentProduct?.createdAt || new Date(),
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue("taxes", 0);
    } else {
      setValue("taxes", currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // toast.success(currentProduct ? "Update success!" : "Create success!");
      // router.push(PATHS.dashboardproduct);
      setIsLoading(true);
      console.log("DATA", data);
      var res = await saveProduct(data);
      if (res) {
        if (!currentProduct) {
          reset(defaultValues);
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        toast.success("Successfully saved product");
      } else toast.error("Error saving product");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("images", [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered =
        values.images && values.images?.filter((file) => file !== inputFile);
      setValue("images", filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue("images", []);
  }, [setValue]);

  // const handleChangeIncludeTaxes = useCallback((event) => {
  //   setIncludeTaxes(event.target.checked);
  // }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: "none" }}>
              <RHFTextField name="id" />
              <RHFTextField name="createdAt" />
            </Box>

            <RHFTextField name="name" label="Product Name" />

            <RHFTextField
              name="subDescription"
              label="Sub Description"
              multiline
              rows={4}
            />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="code" label="Product Code" />

              {/* <RHFTextField name="sku" label="Product SKU" /> */}

              {/* <RHFTextField
                name="quantity"
                label="Quantity"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              /> */}

              {/* <RHFSelect
                native
                name="category"
                label="Category"
                InputLabelProps={{ shrink: true }}
              >
                {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
                  <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </RHFSelect> */}

              <RHFSingleSelect
                checkbox
                name="category"
                label="Category"
                options={PRODUCT_CATEGORY_GROUP_OPTIONS}
              />

              {/* <RHFTextField name="newLabel" label="New Label" />

              <RHFTextField name="saleLabel" label="Sale Label" /> */}

              {/* <RHFMultiSelect
                checkbox
                name="sizes"
                label="Sizes"
                options={PRODUCT_SIZE_OPTIONS}
              /> */}
            </Box>

            {/* <RHFAutocomplete
              name="tags"
              label="Tags"
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            /> */}

            {/* <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <RHFMultiCheckbox
                row
                name="gender"
                spacing={2}
                options={PRODUCT_GENDER_OPTIONS}
              />
            </Stack> */}

            {/* <Divider sx={{ borderStyle: "dashed" }} /> */}

            {/* <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="saleLabel.content"
                label="Sale Label"
                fullWidth
                disabled={!values.saleLabel.enabled}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="newLabel.content"
                label="New Label"
                fullWidth
                disabled={!values.newLabel.enabled}
              />
            </Stack> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  // const renderPricing = (
  //   <>
  //     {mdUp && (
  //       <Grid md={4}>
  //         <Typography variant="h6" sx={{ mb: 0.5 }}>
  //           Pricing
  //         </Typography>
  //         <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //           Price related inputs
  //         </Typography>
  //       </Grid>
  //     )}

  //     <Grid xs={12} md={8}>
  //       <Card>
  //         {!mdUp && <CardHeader title="Pricing" />}

  //         <Stack spacing={3} sx={{ p: 3 }}>
  //           <RHFTextField
  //             name="price"
  //             label="Regular Price"
  //             placeholder="0.00"
  //             type="number"
  //             InputLabelProps={{ shrink: true }}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <Box component="span" sx={{ color: "text.disabled" }}>
  //                     $
  //                   </Box>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />

  //           <RHFTextField
  //             name="priceSale"
  //             label="Sale Price"
  //             placeholder="0.00"
  //             type="number"
  //             InputLabelProps={{ shrink: true }}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <Box component="span" sx={{ color: "text.disabled" }}>
  //                     $
  //                   </Box>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />

  //           {/* <FormControlLabel
  //             control={
  //               <Switch
  //                 checked={includeTaxes}
  //                 onChange={handleChangeIncludeTaxes}
  //               />
  //             }
  //             label="Price includes taxes"
  //           /> */}

  //           {!includeTaxes && (
  //             <RHFTextField
  //               name="taxes"
  //               label="Tax (%)"
  //               placeholder="0.00"
  //               type="number"
  //               InputLabelProps={{ shrink: true }}
  //               InputProps={{
  //                 startAdornment: (
  //                   <InputAdornment position="start">
  //                     <Box component="span" sx={{ color: "text.disabled" }}>
  //                       %
  //                     </Box>
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />
  //           )}
  //         </Stack>
  //       </Card>
  //     </Grid>
  //   </>
  // );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: "flex", alignItems: "center" }}>
        {/* <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        /> */}
        <Stack direction="row" sx={{ flexGrow: 1, pl: 3 }}>
          <RHFSwitch name="publish" helperText={"Publish"} />
          {/* <RHFSwitch name="bestSeller" helperText={"Best Seller"} /> */}
        </Stack>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!currentProduct ? "Create Product" : "Save Changes"}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {/* {renderPricing} */}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
