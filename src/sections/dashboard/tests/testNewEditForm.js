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
import loadingStore from "src/store/loadingStore";
import testStore from "src/store/testStore";

// ----------------------------------------------------------------------
export default function TestNewEditForm({ currentTest }) {
  const router = useRouter();

  const mdUp = useResponsive("up", "md");

  const { setIsLoading } = loadingStore();

  const { saveTest } = testStore();

  const NewTestSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // tags: Yup.array().min(2, "Must have at least 2 tags"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    // not required
    publish: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentTest?.id || 0,
      name: currentTest?.name || "",
      description: currentTest?.description || "",
      //
      code: currentTest?.code || "",
      category: currentTest?.category || "",
      publish: currentTest?.publish ?? true,
      createdAt: currentTest?.createdAt || new Date(),
    }),
    [currentTest]
  );

  const methods = useForm({
    resolver: yupResolver(NewTestSchema),
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
    if (currentTest) {
      reset(defaultValues);
    }
  }, [currentTest, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // toast.success(currentProduct ? "Update success!" : "Create success!");
      // router.push(PATHS.dashboardproduct);
      setIsLoading(true);
      console.log("DATA", data);
      var res = await saveTest(data);
      if (res > 0) {
        router.push(PATHS.dashboardTestDetails(res));
        toast.success("Successfully saved product");
      } else toast.error("Error saving product");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title and short description
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

            <RHFTextField name="name" label="Test Name" />

            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
            />
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
              <RHFTextField name="code" label="Test Code" />

              <RHFSingleSelect
                checkbox
                name="category"
                label="Category"
                options={PRODUCT_CATEGORY_GROUP_OPTIONS}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

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
          {!currentTest ? "Create Test" : "Save Changes"}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

TestNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
