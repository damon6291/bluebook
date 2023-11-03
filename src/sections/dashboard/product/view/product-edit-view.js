import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// routes
import { PATHS } from "src/constants/routeConstants";

// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
// import ProductNewEditForm from "../product-new-edit-form";
import productStore from "src/store/productStore";
import { useState, useEffect } from "react";

import ProductNewEditForm from "../product-new-edit-form";

// ----------------------------------------------------------------------

export default function ProductEditView({ id }) {
  const { getProduct } = productStore();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      setProduct(await getProduct(id));
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
            name: "Product",
            href: PATHS.dashboardproduct,
          },
          { name: product?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={product} />
    </Container>
  );
}

ProductEditView.propTypes = {
  id: PropTypes.string,
};
