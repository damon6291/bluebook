import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import TestQuestionCreateView from "src/sections/dashboard/tests/view/testQuestionCreateView";
import TestQuestionEditView from "src/sections/dashboard/tests/view/testQuestionEditView";

// sections

// ----------------------------------------------------------------------

export default function DashboardQuestionAddEditPage() {
  const params = useParams();

  const { testId, sectionId, questionId } = params;
  return (
    <>
      <Helmet>
        <title> Question Add/Edit </title>
      </Helmet>
      {questionId ? (
        <TestQuestionEditView
          testId={parseInt(testId)}
          sectionId={parseInt(sectionId)}
          id={parseInt(questionId)}
        />
      ) : (
        <TestQuestionCreateView
          testId={parseInt(testId)}
          sectionId={parseInt(sectionId)}
        />
      )}
    </>
  );
}
