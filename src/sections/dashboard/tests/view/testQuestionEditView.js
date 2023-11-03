import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";

// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
// import ProductNewEditForm from "../product-new-edit-form";
import { useState, useEffect, useRef } from "react";

import testStore from "src/store/testStore";
import QuestionNewEditForm from "../questionNewEditForm";
import _ from "lodash";
import { Button, Stack } from "@mui/material";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import { useRouter } from "src/routes/hook";

// ----------------------------------------------------------------------

export default function TestQuestionEditView({ testId, sectionId, id }) {
  const {
    curQuestionEdit,
    curTest,
    curSectionPreview,
    getTestDetails,
    setSectionPreview,
    nextQuestion,
    prevQuestion,
  } = testStore();
  const questionFormRef = useRef();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await setSectionPreview(testId, sectionId, id);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const GoNextQuestion = async () => {
    var qid = await nextQuestion();
    router.push(PATHS.dashboardQuestionEdit(testId, sectionId, qid));
  };

  const GoPrevQuestion = async () => {
    var qid = await prevQuestion();
    router.push(PATHS.dashboardQuestionEdit(testId, sectionId, qid));
  };

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Edit Question"
        links={[
          { name: "Dashboard", href: PATHS.dashboard },
          {
            name: "Tests",
            href: PATHS.dashboardTests,
          },
          {
            name: curTest ? curTest.name : "Test",
            href: PATHS.dashboardTestDetails(testId),
          },
          { name: `Edit Q${curSectionPreview.index + 1}` },
        ]}
        action={
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => questionFormRef.current.clickQuestionPreview()}
              endIcon={<Iconify icon="mdi:eye" />}
            >
              Preview
            </Button>
            <Stack spacing={1}>
              <Button
                variant="contained"
                size="small"
                onClick={GoNextQuestion}
                endIcon={<Iconify icon="carbon:next-filled" />}
                disabled={
                  curSectionPreview.index + 1 ==
                  curSectionPreview.questions.length
                }
              >
                Next Question
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={GoPrevQuestion}
                startIcon={<Iconify icon="carbon:previous-filled" />}
                disabled={curSectionPreview.index == 0}
              >
                Prev Question
              </Button>
              <Button
                variant="contained"
                size="small"
                href={PATHS.dashboardQuestionAdd(testId, sectionId)}
                endIcon={<Iconify icon="mingcute:add-line" />}
              >
                New Question
              </Button>
            </Stack>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {curQuestionEdit != null && curQuestionEdit.id == id ? (
        <QuestionNewEditForm
          currentQuestion={curQuestionEdit}
          sectionId={sectionId}
          testId={testId}
          ref={questionFormRef}
        />
      ) : null}
    </Container>
  );
}
