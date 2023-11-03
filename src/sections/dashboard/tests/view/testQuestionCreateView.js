// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";
// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import TestNewEditForm from "../testNewEditForm";
import QuestionNewEditForm from "../questionNewEditForm";
import testStore from "src/store/testStore";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_QUESTION } from "src/constants/productConstants";
import { Button, Stack } from "@mui/material";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function TestQuestionCreateView({ testId, sectionId }) {
  const { curTest, setSectionPreview } = testStore();
  const questionFormRef = useRef();

  useEffect(() => {
    setSectionPreview(testId, sectionId, 0);
  }, []);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Create a New Question"
        links={[
          {
            name: "Dashboard",
            href: PATHS.dashboard,
          },
          {
            name: "Tests",
            href: PATHS.dashboardTests,
          },
          {
            name: curTest.name ?? "Test",
            href: PATHS.dashboardTestDetails(testId),
          },
          { name: "New Question" },
        ]}
        action={
          <Button
            variant="contained"
            size="medium"
            onClick={() => questionFormRef.current.clickQuestionPreview()}
            endIcon={<Iconify icon="mdi:eye" />}
          >
            Preview
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <QuestionNewEditForm
        currentQuestion={DEFAULT_QUESTION}
        sectionId={sectionId}
        testId={testId}
        ref={questionFormRef}
      />
    </Container>
  );
}
