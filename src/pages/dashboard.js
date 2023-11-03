import { Helmet } from "react-helmet-async";
import TestSelectView from "src/sections/dashboard/tests/view/testSelectView";
// sections

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const studentView = <TestSelectView />;

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      {studentView}
    </>
  );
}
