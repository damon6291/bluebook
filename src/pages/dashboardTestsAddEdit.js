import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import TestCreateView from "src/sections/dashboard/tests/view/testCreateView";
import TestEditView from "src/sections/dashboard/tests/view/testEditView";
// sections

// ----------------------------------------------------------------------

export default function DashboardTestsAddEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Test Add/Edit </title>
      </Helmet>

      {id ? <TestEditView id={parseInt(id)} /> : <TestCreateView />}
    </>
  );
}
