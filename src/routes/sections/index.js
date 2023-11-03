import { Navigate, useRoutes } from "react-router-dom";
// layouts

// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from "./main";

import { PAGEHOME, PAGE404, PAGELOGIN } from "src/constants/routeConstants";
// import { authRoutes } from './auth';
// import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from "./dashboard";
// import { componentsRoutes } from './components';
import { testRoutes } from "./test";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: PAGEHOME,
      element: <Navigate to={PAGELOGIN} replace />,
    },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: PAGEHOME,
    //   element: (
    //     // <MainLayout>
    //     //   <HomePage />
    //     // </MainLayout>
    //   ),
    // },

    // // Auth routes
    // ...authRoutes,
    // ...authDemoRoutes,
    ...testRoutes,

    // // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // // Components routes
    // ...componentsRoutes,

    // No match 404
    { path: "*", element: <Navigate to={PAGE404} replace /> },
  ]);
}
