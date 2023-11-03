import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// layouts
// import SimpleLayout from "../../layouts/simpleLayout";
// components
import { SplashScreen } from "src/components/loading-screen";
import AuthGuard from "src/layouts/auth/auth-guard";

// ----------------------------------------------------------------------

const TestPage = lazy(() => import("src/pages/test"));

// ----------------------------------------------------------------------

export const testRoutes = [
  {
    element: (
      <AuthGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </AuthGuard>
    ),
    children: [
      {
        path: "/test/:testId",
        element: <TestPage />,
      },
    ],
  },
];
