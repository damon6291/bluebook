import { Helmet } from "react-helmet-async";
import TestListView from "src/sections/dashboard/tests/view/testListView";
// sections

// ----------------------------------------------------------------------

export default function DashboardTestsPage() {
  return (
    <>
      <Helmet>
        <title> Tests </title>
      </Helmet>
      <TestListView />
    </>
  );
}
