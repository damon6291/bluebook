import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import QuestionPreview from "src/sections/dashboard/tests/view/questionPreview";

// sections

// ----------------------------------------------------------------------

export default function DashboardQuestionPreviewPage() {
  const params = useParams();

  const { testId, sectionId, questionId } = params;
  return (
    <>
      <Helmet>
        <title> Question Preview </title>
      </Helmet>

      <QuestionPreview
        testId={parseInt(testId)}
        sectionId={parseInt(sectionId)}
        questionId={parseInt(questionId)}
      />
    </>
  );
}
