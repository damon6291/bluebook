import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import Products from "src/sections/products/products";
import ProductHero from "src/sections/products/productHero";
import ProductCategory from "src/sections/products/productCategory";
import { Box } from "@mui/material";

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>
      <ProductHero />
      <br />
      <ProductCategory />
      <Box sx={{ my: { xs: 5, sm: 8 } }} />
      <Products />
    </>
  );
}
