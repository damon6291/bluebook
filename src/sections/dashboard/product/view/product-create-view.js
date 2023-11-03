// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";
// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import ProductNewEditForm from "../product-new-edit-form";

// ----------------------------------------------------------------------

export default function ProductCreateView() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Create a New Test"
        links={[
          {
            name: "Dashboard",
            href: PATHS.dashboard,
          },
          {
            name: "Tests",
            href: PATHS.dashboardTests,
          },
          { name: "New Test" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm />
    </Container>
  );
}
