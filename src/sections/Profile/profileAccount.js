import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
// utils
import { fData } from "src/utils/format-number";
// routes
import { PATHS } from "src/constants/routeConstants";
import { useRouter } from "src/routes/hook";
// assets
// import { countries } from "src/assets/data";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from "src/components/hook-form";
import { toast } from "react-toastify";
import userStore from "src/store/userStore";

// ----------------------------------------------------------------------

export default function ProfileAccount() {
  const router = useRouter();
  const { user } = userStore();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      isVerified: user?.isVerified || true,
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast("Update success!");
      router.push(PATHS.home);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
          <RHFTextField name="email" label="Email Address" />
          <RHFTextField
            name="isVerified"
            label="Email Verified"
            disabled
            value="True" // True or false
          />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
