// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";
// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import testStore from "src/store/testStore";
import { useState, useEffect } from "react";
import QuestionView from "../questionView";

// ----------------------------------------------------------------------

export default function QuestionPreview({ testId, sectionId, questionId }) {
  const { getTest, curQuestion, curSectionPreview } = testStore();
  const [test, setTest] = useState({});
  useEffect(() => {
    (async () => {
      setTest(await getTest(testId));
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading="Question Preview"
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
            name: test.name ?? "Test",
            href: PATHS.dashboardTestDetails(testId),
          },
          {
            name:
              curQuestion.id > 0
                ? `Q${curSectionPreview.index + 1}`
                : "New Question",
            href:
              curQuestion.id > 0
                ? PATHS.dashboardQuestionEdit(testId, sectionId, curQuestion.id)
                : PATHS.dashboardQuestionAdd(testId, sectionId),
          },
          {
            name: "Preview",
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <QuestionView
        testId={testId}
        sectionId={sectionId}
        questionId={questionId}
        isPreview={true}
      />
    </Container>
  );
}
