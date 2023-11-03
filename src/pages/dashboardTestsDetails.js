import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import TestDetailsView from "src/sections/dashboard/tests/view/testDetailsView";
// sections

// ----------------------------------------------------------------------

export default function DashboardTestsDetailPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Test Details </title>
      </Helmet>
      <TestDetailsView id={id} />
    </>
  );
}
