import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";

// sections

// ----------------------------------------------------------------------

export default function DashboardStudentsAddEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Student Add/Edit </title>
      </Helmet>
      Students add edit
    </>
  );
}
