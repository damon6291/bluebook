import { Helmet } from "react-helmet-async";
import { useParams } from "src/routes/hook";
import ProductShopDetailsView from "src/sections/dashboard/product/view/product-shop-details-view";

export default function ProductDetailPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Product Detail </title>
      </Helmet>
      <ProductShopDetailsView id={id} />
    </>
  );
}
