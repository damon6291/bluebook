import { useCallback, useState, useEffect } from "react";
// @mui
// import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

// import { useDebounce } from "src/hooks/use-debounce";
// // routes
// import { PATHS } from "src/utils/routeConstants";

// api
// import { useGetProducts, useSearchProducts } from "src/api/product";
import EmptyContent from "src/components/empty-content";
//
import ProductList from "./product-list";
// import ProductSearch from "./product-search";

import productStore from "src/store/productStore";
import { MotionViewport } from "src/components/animate";
import { PRODUCT_CATEGORY_GROUP_OPTIONS } from "src/constants/productConstants";

// ----------------------------------------------------------------------

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  const { products, getProducts, shopTab: tab } = productStore();
  const [tabProducts, setTabProducts] = useState(products);

  // const funcTabProduct = () => {
  //   const category = PRODUCT_CATEGORY_GROUP_OPTIONS[tab];
  //   console.log("category", category);
  //   setTabProducts(products.filter((x) => x.category === category.value));
  // };

  const funcTabProduct = useCallback(() => {
    const category = PRODUCT_CATEGORY_GROUP_OPTIONS[tab];
    setTabProducts(products.filter((x) => x.category === category.value));
  }, [tab, products]);

  useEffect(() => {
    (async () => {
      await getProducts();
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  useEffect(() => {
    funcTabProduct();
  }, [tab, products]);

  // const debouncedQuery = useDebounce(searchQuery);

  //   const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);

  // const handleSearch = useCallback((inputValue) => {
  //   setSearchQuery(inputValue);
  // }, []);

  // const renderFilters = (
  //   <Stack
  //     spacing={3}
  //     justifyContent="space-between"
  //     alignItems={{ xs: "flex-end", sm: "center" }}
  //     direction={{ xs: "column", sm: "row" }}
  //   >
  //     <ProductSearch
  //       query={debouncedQuery}
  //       results={products}
  //       onSearch={handleSearch}
  //       hrefItem={(id) => PATHS.home}
  //     />
  //   </Stack>
  // );

  return (
    <Container
      component={MotionViewport}
      sx={{
        mb: 15,
      }}
    >
      {tabProducts.length === 0 ? (
        <EmptyContent />
      ) : (
        <ProductList products={tabProducts} />
      )}
    </Container>
  );
}
