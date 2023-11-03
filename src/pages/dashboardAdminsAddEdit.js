import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";

// sections

// ----------------------------------------------------------------------

export default function DashboardAdminsAddEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Admin Add/Edit </title>
      </Helmet>
      Admin add edit
    </>
  );
}
