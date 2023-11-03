// @mui
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import testStore from "src/store/testStore";
import loadingStore from "src/store/loadingStore";
import FormProvider from "src/components/hook-form/form-provider";
import { Stack } from "@mui/material";
import { RHFSingleSelect } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useRouter } from "src/routes/hook";
import { PATHS } from "src/constants/routeConstants";
import { toast } from "react-toastify";
//

// ----------------------------------------------------------------------

export default function TestSelectView() {
  const { tests, getTests, removeSectionPreview } = testStore();
  const { setIsLoading } = loadingStore();
  const [testOptions, setTestOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTests();
  }, []);

  const testToOptions = (object) => {
    var ret = [];
    object.map((x) => {
      ret.push({ enum: x.id, value: x.name });
    });
    setTestOptions(ret);
  };

  useEffect(() => {
    testToOptions(tests);
  }, [tests]);

  useEffect(() => {
    removeSectionPreview();
  }, []);

  const NewSchema = Yup.object().shape({
    type: Yup.string().required("Test type is required"),
  });

  const defaultValues = {
    type: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      var selectedOption = testOptions.filter((x) => x.value == data.type)[0];
      if (selectedOption) {
        router.push(PATHS.test(selectedOption.enum));
      } else {
        toast.error("Failed loading test");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Home"
        links={[{ name: "Practice and Prepare" }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <RHFSingleSelect
              checkbox
              name="type"
              label="Test Type"
              options={testOptions}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Start Test
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </Container>
  );
}

// export const SECTION_CATEGORY_GROUP_OPTIONS = [
//     { enum: 1, value: "SATREADING", icon: ICOW },
//     { enum: 2, value: "SATMATH", icon: ICOW },
//   ];
