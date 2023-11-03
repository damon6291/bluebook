import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";

// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
// import ProductNewEditForm from "../product-new-edit-form";
import { useState, useEffect } from "react";

import TestNewEditForm from "../testNewEditForm";
import testStore from "src/store/testStore";

// ----------------------------------------------------------------------

export default function TestEditView({ id }) {
  const { getTest } = testStore();
  const [test, setTest] = useState({});

  useEffect(() => {
    (async () => {
      setTest(await getTest(id));
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: "Dashboard", href: PATHS.dashboard },
          {
            name: "Tests",
            href: PATHS.dashboardTests,
          },
          { name: test?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TestNewEditForm currentTest={test} />
    </Container>
  );
}

TestEditView.propTypes = {
  id: PropTypes.number,
};
