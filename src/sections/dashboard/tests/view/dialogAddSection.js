import PropTypes from "prop-types";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// components
import Iconify from "src/components/iconify";
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
  RHFSingleSelect,
} from "src/components/hook-form";
import { SECTION_CATEGORY_GROUP_OPTIONS } from "src/constants/productConstants";
import loadingStore from "src/store/loadingStore";
import testStore from "src/store/testStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function DialogAddSection({ open, onClose, testId }) {
  const { saveSection } = testStore();
  const { setIsLoading } = loadingStore();

  const NewTestSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    timeLimit: Yup.number()
      .integer()
      .min(0)
      .required("Time limit should be greater than 0"),
  });

  const defaultValues = {
    category: "SATMATH",
    timeLimit: 45,
  };

  const methods = useForm({
    resolver: yupResolver(NewTestSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      console.log("DATA", data);
      data.id = 0;
      data.testId = testId;
      var res = await saveSection(data);
      if (res > 0) {
        toast.success("Successfully saved Section");
        onClose();
      } else toast.error("Failed saving Section");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>New Section</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <RHFSingleSelect
              checkbox
              name="category"
              label="Category"
              options={SECTION_CATEGORY_GROUP_OPTIONS}
            />
            <RHFTextField name="timeLimit" label="Time Limit" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Section
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

DialogAddSection.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
