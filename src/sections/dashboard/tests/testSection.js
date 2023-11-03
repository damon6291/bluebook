import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useCallback, useMemo, useEffect, useState } from "react";
import FormProvider from "src/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loadingStore from "src/store/loadingStore";
import { toast } from "react-toastify";
import testStore from "src/store/testStore";
import { LoadingButton } from "@mui/lab";
import { RHFSingleSelect, RHFTextField } from "src/components/hook-form";
import {
  DEFAULT_QUESTION,
  SECTION_CATEGORY_GROUP_OPTIONS,
} from "src/constants/productConstants";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "src/routes/hook";
import { PATHS } from "src/constants/routeConstants";

// ----------------------------------------------------------------------

export default function TestSection({ section, number, testId }) {
  const [questions, setQuestions] = useState([]);
  const { setIsLoading } = loadingStore();
  const { saveSection, deleteSection, setSectionPreview } = testStore();

  const theme = useTheme();
  const router = useRouter();

  const NewTestSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    timeLimit: Yup.number()
      .integer()
      .min(0)
      .required("Time limit should be greater than 0"),
  });

  const defaultValues = useMemo(
    () => ({
      category: section?.category || "SATMATH",
      timeLimit: section?.timeLimit || 45,
    }),
    [section]
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
    formState: { isSubmitting, isDirty },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      console.log("DATA", data);
      data.id = section.id;
      data.testId = testId;
      var res = await saveSection(data);
      if (res > 0) toast.success("Successfully saved Section");
      else toast.error("Failed saving Section");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const previewSection = async () => {
    var questionId = await setSectionPreview(testId, section.id, null);
    window.open(
      PATHS.dashboardQuestionPreview(testId, section.id, questionId),
      "_blank"
    );
  };

  const removeSection = () => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      deleteSection(section.id);
    }
  };

  const addQuestion = () => {
    // setQuestions([...questions]);
    router.push(PATHS.dashboardQuestionAdd(testId, section.id));
  };

  const editQuestion = (question) => {
    if (question.id == 0)
      router.push(PATHS.dashboardQuestionAdd(testId, section.id));
    else
      router.push(PATHS.dashboardQuestionEdit(testId, section.id, question.id));
  };

  useEffect(() => {
    setQuestions(section.questions);
  }, [section]);

  return (
    <>
      <Container
        sx={{
          border: `1px solid ${section.id != 0 && !isDirty ? "black" : "Red"}`,
          borderStyle: "dashed",
          p: 2,
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5" gutterBottom>
              Section {number + 1}
            </Typography>
            <Stack spacing={3}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
              >
                <RHFSingleSelect
                  checkbox
                  name="category"
                  label="Category"
                  options={SECTION_CATEGORY_GROUP_OPTIONS}
                />
                <RHFTextField name="timeLimit" label="Time Limit" />
              </Box>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Stack spacing={1}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="medium"
                  loading={isSubmitting}
                  disabled={section.id != 0 && !isDirty}
                >
                  Save Section
                </LoadingButton>
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  onClick={removeSection}
                >
                  Delete Section
                </Button>
              </Stack>
              <Stack spacing={1}>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={section.questions.length == 0}
                  onClick={async () => previewSection()}
                >
                  Preview Section
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="warning"
                  onClick={addQuestion}
                  disabled={section.id == 0}
                >
                  New Question
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </FormProvider>
        <br />
        <Divider color="black" sx={{ borderStyle: "dashed" }} />
        <br />
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(4, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(12, 1fr)",
          }}
        >
          {questions.map((question, key) => {
            return (
              <Button
                key={key}
                sx={{
                  position: "relative",
                  width: "100%",
                  margin: "5px",
                  ":before": {
                    content: '""',
                    display: "block",
                    paddingTop: "100%",
                  },
                  bgcolor: theme.palette.success.main,
                  color: theme.palette.common.white,
                  ":hover": {
                    color: theme.palette.common.black,
                  },
                }}
                onClick={() => editQuestion(question)}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"100%"}
                  lineHeight={"100%"}
                  borderRadius={"10px"}
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position={"absolute"}
                >
                  Q {key + 1}
                </Box>
              </Button>
            );
          })}
        </Box>
      </Container>
    </>
  );
}

// <Container sx={{ border: "1px solid black", borderStyle: "dashed" }}>
// <Typography variant="h5" gutterBottom>
//   Section 1
// </Typography>

// </Container>
