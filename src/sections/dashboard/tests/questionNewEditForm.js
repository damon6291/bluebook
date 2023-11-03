import PropTypes from "prop-types";
import * as Yup from "yup";
import { useMemo, useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
// routes
import { PATHS } from "src/constants/routeConstants";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// _mock
import { useRouter } from "src/routes/hook";
import FormProvider, {
  RHFEditor,
  RHFTextField,
  RHFSingleSelect,
  RHFCheckbox,
} from "src/components/hook-form";
import { toast } from "react-toastify";

import {
  QUESTION_RESPONSE_TYPE,
  QUESTION_VIEW_TYPE,
} from "src/constants/productConstants";
import loadingStore from "src/store/loadingStore";
import testStore from "src/store/testStore";

// ----------------------------------------------------------------------
const QuestionNewEditForm = forwardRef(
  ({ currentQuestion, sectionId, testId }, ref) => {
    const router = useRouter();

    const mdUp = useResponsive("up", "md");

    const { setIsLoading } = loadingStore();

    const { saveQuestion, setCurQuestion, setSectionPreview } = testStore();

    const NewQuestionSchema = Yup.object().shape({
      // tags: Yup.array().min(2, "Must have at least 2 tags"),
      questionParagraph: Yup.string(),
      questionText: Yup.string().required("Question text is required"),
      explanation: Yup.string(),
      responseType: Yup.string(),
      viewType: Yup.string(),

      // not required
    });

    const defaultValues = useMemo(
      () => ({
        id: currentQuestion?.id || 0,
        questionParagraph: currentQuestion?.questionParagraph || "",
        questionText: currentQuestion?.questionText || "",
        explanation: currentQuestion?.explanation || "",
        responseType: currentQuestion?.responseType || "MCP",
        viewType: currentQuestion?.viewType || "DOUBLE",
        choiceA: currentQuestion?.choiceA || "",
        choiceB: currentQuestion?.choiceB || "",
        choiceC: currentQuestion?.choiceC || "",
        choiceD: currentQuestion?.choiceD || "",
        correctA: currentQuestion?.correctA || false,
        correctB: currentQuestion?.correctB || false,
        correctC: currentQuestion?.correctC || false,
        correctD: currentQuestion?.correctD || false,
        answer: currentQuestion?.answer || "",
      }),
      [currentQuestion]
    );

    const methods = useForm({
      resolver: yupResolver(NewQuestionSchema),
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

    useImperativeHandle(ref, () => ({
      clickQuestionPreview() {
        setCurQuestion(values);
        window.open(
          PATHS.dashboardQuestionPreview(testId, sectionId, currentQuestion.id),
          "_blank"
        );
      },
    }));

    useEffect(() => {
      if (currentQuestion) {
        reset(defaultValues);
      }
    }, [currentQuestion, defaultValues, reset]);

    const onSubmit = handleSubmit(async (data) => {
      try {
        setIsLoading(true);
        data["sectionId"] = sectionId;
        data["id"] = currentQuestion.id;
        data["idA"] = currentQuestion.idA;
        data["idB"] = currentQuestion.idB;
        data["idC"] = currentQuestion.idC;
        data["idD"] = currentQuestion.idd;
        data["idAnswer"] = currentQuestion.idAnswer;
        console.log("DATA", data);
        var res = await saveQuestion(data);
        if (res > 0) {
          if (currentQuestion.id == 0) {
            router.push(PATHS.dashboardQuestionEdit(testId, sectionId, res));
          } else {
            window.scrollTo(0, 0);
          }
          // router.push(PATHS.dashboardTestDetails(testId));
          toast.success("Successfully saved question");
        } else toast.error("Error saving question");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });

    const renderQuestion = (
      <>
        {console.log("current question", currentQuestion)}
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Question
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Question paragraph and text
            </Typography>
          </Grid>
        )}

        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Question" />}
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
                <RHFSingleSelect
                  checkbox
                  name="viewType"
                  label="View Type"
                  options={QUESTION_VIEW_TYPE}
                />
                <RHFSingleSelect
                  checkbox
                  name="responseType"
                  label="Response Type"
                  options={QUESTION_RESPONSE_TYPE}
                  disabled={currentQuestion.id != 0}
                />
              </Box>
            </Stack>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Paragraph</Typography>
                <RHFEditor simple name="questionParagraph" height="500px" />
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Text</Typography>
                <RHFEditor simple name="questionText" height="100px" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </>
    );

    const renderMCP = (
      <>
        <Stack spacing={1.5}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Choice A</Typography>
            <RHFCheckbox name="correctA" label="Correct" />
          </Stack>

          <RHFEditor simple name="choiceA" height="100px" />
        </Stack>
        <Stack spacing={1.5}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Choice B</Typography>
            <RHFCheckbox name="correctB" label="Correct" />
          </Stack>
          <RHFEditor simple name="choiceB" height="100px" />
        </Stack>
        <Stack spacing={1.5}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Choice C</Typography>
            <RHFCheckbox name="correctC" label="Correct" />
          </Stack>
          <RHFEditor simple name="choiceC" height="100px" />
        </Stack>
        <Stack spacing={1.5}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Choice D</Typography>
            <RHFCheckbox name="correctD" label="Correct" />
          </Stack>
          <RHFEditor simple name="choiceD" height="100px" />
        </Stack>
      </>
    );

    const renderSA = <RHFTextField name="answer" label="Answer" />;

    const renderAnswers = (
      <>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Answers
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Answer Choices
            </Typography>
          </Grid>
        )}

        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Answers" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              {values.responseType == "MCP" ? renderMCP : renderSA}
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Explanation</Typography>
                <RHFEditor simple name="explanation" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </>
    );

    const renderActions = (
      <>
        {mdUp && <Grid md={4} />}
        <Grid
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            disabled={currentQuestion.id != 0 && !isDirty}
          >
            {!currentQuestion ? "Create Question" : "Save Question"}
          </LoadingButton>
        </Grid>
      </>
    );

    return (
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderQuestion}

          {renderAnswers}

          {renderActions}
        </Grid>
      </FormProvider>
    );
  }
);

QuestionNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};

export default QuestionNewEditForm;
