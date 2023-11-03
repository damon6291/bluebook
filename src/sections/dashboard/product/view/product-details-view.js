import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";
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
// _mock
import { PUBLISH_OPTIONS } from "src/constants/productConstants";
// routes
import { PATHS } from "src/constants/routeConstants";
import { RouterLink } from "src/routes/components";

// components
import Iconify from "src/components/iconify";
import EmptyContent from "src/components/empty-content";
//
import { ProductDetailsSkeleton } from "../product-skeleton";
import ProductDetailsReview from "../product-details-review";
import ProductDetailsSummary from "../product-details-summary";
import ProductDetailsToolbar from "../product-details-toolbar";
import ProductDetailsCarousel from "../product-details-carousel";
import ProductDetailsDescription from "../product-details-description";
import productStore from "src/store/productStore";
import { useBoolean } from "src/hooks/use-boolean";

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

export default function ProductDetailsView({ id }) {
  const { getProduct } = productStore();

  const loading = useBoolean();

  const [product, setProduct] = useState({});

  const [currentTab, setCurrentTab] = useState("description");

  const [publish, setPublish] = useState("");

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  useEffect(() => {
    loading.onTrue();
    setProduct(getProduct(id));
    loading.onFalse();
  }, [id]);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={"There is an error"}
      action={
        <Button
          component={RouterLink}
          href={PATHS.dashboardproduct}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <ProductDetailsToolbar
        backLink={PATHS.dashboardproduct}
        editLink={PATHS.productEdit(`${product?.id}`)}
        liveLink={PATHS.product(`${product?.id}`)}
        publish={publish || ""}
        onChangePublish={handleChangePublish}
        publishOptions={PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary disabledActions product={product} />
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
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: "description",
              label: "Description",
            },
            {
              value: "reviews",
              label: `Reviews (${product.reviews.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === "description" && (
          <ProductDetailsDescription description={product?.description} />
        )}

        {currentTab === "reviews" && (
          <ProductDetailsReview
            ratings={product.ratings}
            reviews={product.reviews}
            totalRatings={product.totalRatings}
            totalReviews={product.totalReviews}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container>
      {loading && renderSkeleton}

      {!loading && Object.keys(product).length == 0 && renderError}

      {product && renderProduct}
    </Container>
  );
}

ProductDetailsView.propTypes = {
  id: PropTypes.string,
};
