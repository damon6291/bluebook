import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// layouts
// import SimpleLayout from "../../layouts/simpleLayout";
// components
import { SplashScreen } from "src/components/loading-screen";
import {
  PAGE404,
  PAGECOMINGSOON,
  PAGEMAINTENANCE,
  PAGELOGIN,
  PAGEREGISTER,
} from "src/constants/routeConstants";
import AuthModernLayout from "src/layouts/modern";
import LoginGuard from "src/layouts/auth/loginGuard";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("src/pages/home"));
const Page404 = lazy(() => import("src/pages/page404"));
// const FaqsPage = lazy(() => import("src/pages/faqs"));
// const PricingPage = lazy(() => import("src/pages/pricing"));
// const PaymentPage = lazy(() => import("src/pages/payment"));
const ComingSoonPage = lazy(() => import("src/pages/comingSoon"));
const MaintenancePage = lazy(() => import("src/pages/maintenance"));
const ProfilePage = lazy(() => import("src/pages/profile"));
// // PRODUCT

const LoginPage = lazy(() => import("src/pages/login"));
const RegisterPage = lazy(() => import("src/pages/register"));
// const ProductListPage = lazy(() => import("src/pages/product/list"));
// const ProductCheckoutPage = lazy(() => import("src/pages/product/checkout"));
// // BLOG
// const PostListPage = lazy(() => import("src/pages/post/list"));
// const PostDetailsPage = lazy(() => import("src/pages/post/details"));

// ----------------------------------------------------------------------

export const mainRoutes = [
  // {
  //   element: (
  //     <MainLayout>
  //       <Suspense fallback={<SplashScreen />}>
  //         <Outlet />
  //       </Suspense>
  //     </MainLayout>
  //   ),
  //   children: [
  //     { path: PAGESHOP, element: <ShopPage /> },
  //     { path: PAGECONTACTUS, element: <ContactPage /> },
  //     {
  //       path: PAGEPRODUCTS,
  //       element: <ProductsPage />,
  //     },
  //     {
  //       path: PAGEPRODUCT,
  //       children: [
  //         { element: <ProductDetailPage />, index: true },
  //         { path: ":id", element: <ProductDetailPage /> },
  //       ],
  //     },
  //     {
  //       path: PAGESHOPPINGCART,
  //       element: <ShoppingCartPage />,
  //     },
  //   ],
  //   //   { path: "faqs", element: <FaqsPage /> },
  //   //   {
  //   //     path: "product",
  //   //     children: [
  //   //       { element: <ProductListPage />, index: true },
  //   //       { path: "list", element: <ProductListPage /> },
  //   //       { path: ":id", element: <ProductDetailsPage /> },
  //   //       { path: "checkout", element: <ProductCheckoutPage /> },
  //   //     ],
  //   //   },
  //   //   {
  //   //     path: "post",
  //   //     children: [
  //   //       { element: <PostListPage />, index: true },
  //   //       { path: "list", element: <PostListPage /> },
  //   //       { path: ":title", element: <PostDetailsPage /> },
  //   //     ],
  //   //   },
  //   // ],
  // },
  {
    element: (
      <LoginGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </LoginGuard>
    ),
    children: [
      {
        path: PAGELOGIN,
        element: (
          <AuthModernLayout>
            <LoginPage />
          </AuthModernLayout>
        ),
      },
      {
        path: PAGEREGISTER,
        element: (
          <AuthModernLayout>
            <RegisterPage />
          </AuthModernLayout>
        ),
      },
    ],
  },
  // {
  //   element: (
  //     <AuthGuard>
  //       <MainLayout>
  //         <Suspense fallback={<SplashScreen />}>
  //           <Outlet />
  //         </Suspense>
  //       </MainLayout>
  //     </AuthGuard>
  //   ),
  //   children: [
  //     {
  //       path: PAGEPROFILE,
  //       element: <ProfilePage />,
  //     },
  //     {
  //       path: "order",
  //       children: [{ path: ":id", element: <OrderDetailPage /> }],
  //     },
  //   ],
  // },
  {
    element: (
      // <CompactLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
      // </CompactLayout>
    ),
    children: [
      { path: PAGECOMINGSOON, element: <ComingSoonPage /> },
      { path: PAGEMAINTENANCE, element: <MaintenancePage /> },
      { path: PAGE404, element: <Page404 /> },
    ],
  },
];
