import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// routes
import { PATHS } from "src/constants/routeConstants";
import { RouterLink } from "src/routes/components";
// components
import Iconify from "src/components/iconify";
import EmptyContent from "src/components/empty-content";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import ProductDetailsReview from "../product-details-review";
import { ProductDetailsSkeleton } from "../product-skeleton";
import ProductDetailsSummary from "../product-details-summary";
import ProductDetailsCarousel from "../product-details-carousel";
import ProductDetailsDescription from "../product-details-description";
import productStore from "src/store/productStore";
import { useBoolean } from "src/hooks/use-boolean";
import checkoutStore from "src/store/checkoutStore";
import { CardHeader } from "@mui/material";

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: "100% Original",
    description: "Chocolate bar candy canes ice cream toffee cookie halvah.",
    icon: "solar:verified-check-bold",
  },
  {
    title: "10 Day Replacement",
    description: "Marshmallow biscuit donut dragée fruitcake wafer.",
    icon: "solar:clock-circle-bold",
  },
  {
    title: "Year Warranty",
    description: "Cotton candy gingerbread cake I love sugar sweet.",
    icon: "solar:shield-check-bold",
  },
];

// ----------------------------------------------------------------------

export default function ProductShopDetailsView({ id }) {
  const [product, setProduct] = useState({});

  const { getProduct } = productStore();
  const { shoppingCart, count, addProductToCart, setCheckoutStep } =
    checkoutStore();

  const loading = useBoolean();

  useEffect(() => {
    window.scroll(0, 0);
    (async () => {
      loading.onTrue();
      setProduct(await getProduct(id));
      loading.onFalse();
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`There is an error`}
      action={
        <Button
          component={RouterLink}
          href={PATHS.products}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = (
    <>
      <CustomBreadcrumbs
        links={[
          { name: "Home", href: "/" },
          {
            name: "Products",
            href: PATHS.products,
          },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            items={shoppingCart}
            onAddCart={addProductToCart}
            onGotoStep={setCheckoutStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: "center", px: 5 }}>
            <Iconify
              icon={item.icon}
              width={32}
              sx={{ color: "primary.main" }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <CardHeader
          title={"Description"}
          sx={{
            p: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        />
        <ProductDetailsDescription description={product?.description} />

        {/* {currentTab === "reviews" && (
          <ProductDetailsReview
            ratings={product.ratings}
            reviews={product.reviews}
            totalRatings={product.totalRatings}
            totalReviews={product.totalReviews}
          />
        )} */}
      </Card>

      <Box sx={{ my: 5 }} />

      <Card>
        <CardHeader
          title={"Reviews"}
          sx={{
            p: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        />
        TODO: Review
        {/* <ProductDetailsReview
          ratings={product.ratings}
          reviews={product.reviews}
          totalRatings={product.totalRatings}
          totalReviews={product.totalReviews}
        /> */}
      </Card>
    </>
  );

  return (
    <Container
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      {/* <CartIcon totalItems={count} /> */}

      {loading.value ? renderSkeleton : <></>}

      {!loading.value && Object.keys(product).length == 0 && renderError}

      {Object.keys(product).length > 0 && renderProduct}
    </Container>
  );
}

ProductShopDetailsView.propTypes = {
  id: PropTypes.string,
};
