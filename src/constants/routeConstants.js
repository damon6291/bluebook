export const PAGEHOME = "/";
export const PAGESIGNUP = "/signup";
export const PAGELOGIN = "/login";
export const PAGEREGISTER = "/register";
export const PAGE404 = "/404";
export const PAGEMAINTENANCE = "/maintenance";
export const PAGECOMINGSOON = "/coming-soon";
export const PAGEPROFILE = "/profile";

export const PAGEDASHBOARD = "/dashboard";
export const PAGEDASHBOARDHISTORY = "/dashboard/history";
export const PAGEDASHBOARDTESTS = "/dashboard/tests";
export const PAGEDASHBOARDREPORTS = "/dashboard/reports";
export const PAGEDASHBOARDADMINS = "/dashboard/admins";
export const PAGEDASHBOARDSTUDENTS = "/dashboard/students";

export const PAGETEST = "/test";

export const PATHS = {
  home: PAGEHOME,
  login: PAGELOGIN,
  register: PAGEREGISTER,
  page404: PAGE404,
  maintenance: PAGEMAINTENANCE,
  comingSoon: PAGECOMINGSOON,

  profile: PAGEPROFILE,

  test: (id) => `${PAGETEST}/${id}`,

  // order: (id) => `${PAGEORDER}/${id}`,
  dashboard: PAGEDASHBOARD,
  dashboardHistory: PAGEDASHBOARDHISTORY,
  dashboardTests: PAGEDASHBOARDTESTS,
  dashboardReports: PAGEDASHBOARDREPORTS,
  dashboardTestsAdd: `${PAGEDASHBOARDTESTS}/new`,
  dashboardTestsEdit: (id) => `${PAGEDASHBOARDTESTS}/edit/${id}`,
  dashboardTestDetails: (id) => `${PAGEDASHBOARDTESTS}/details/${id}`,

  dashboardAdmins: PAGEDASHBOARDADMINS,
  dashboardAdminsAdd: `${PAGEDASHBOARDADMINS}/new`,
  dashboardAdminsEdit: (id) => `${PAGEDASHBOARDADMINS}/edit/${id}`,
  dashboardStudents: PAGEDASHBOARDSTUDENTS,
  dashboardStudentsAdd: `${PAGEDASHBOARDSTUDENTS}/new`,
  dashboardStudentsEdit: (id) => `${PAGEDASHBOARDSTUDENTS}/edit/${id}`,

  dashboardQuestionAdd: (testId, sectionId) =>
    `${PAGEDASHBOARDTESTS}/${testId}/section/${sectionId}/question/new`,
  dashboardQuestionEdit: (testId, sectionId, questionId) =>
    `${PAGEDASHBOARDTESTS}/${testId}/section/${sectionId}/question/${questionId}`,
  dashboardQuestionPreview: (testId, sectionId, questionId) =>
    `${PAGEDASHBOARDTESTS}/${testId}/section/${sectionId}/question/preview/${questionId}`,
};

// export const navConfig = [
//   {
//     title: "Home",
//     icon: <ICONS.HomeIcon />,
//     path: "/",
//   },
//   {
//     title: "Shop",
//     icon: <ICONS.PeopleIcon />,
//     path: PATHS.shop,
//   },
//   {
//     title: "Products",
//     icon: <ICONS.KebabDiningIcon />,
//     path: PATHS.products,
//   },
//   {
//     title: "Contact us",
//     icon: <ICONS.MapIcon />,
//     path: PATHS.contactUs,
//   },
// {
//   title: "Pages",
//   path: "/pages",
//   icon: <Iconify icon="solar:file-bold-duotone" />,
//   children: [
//     {
//       subheader: "Other",
//       items: [
//         {
//           title: "About us",
//           path: PATHS.page404,
//           icon: <Iconify icon="solar:home-2-bold-duotone" />,
//         },
//         { title: "Contact us", path: PATHS.page404 },
//         { title: "FAQs", path: PATHS.page404 },
//         { title: "Pricing", path: PATHS.page404 },
//         { title: "Payment", path: PATHS.page404 },
//         { title: "Maintenance", path: PATHS.maintenance },
//         { title: "Coming Soon", path: PATHS.comingSoon },
//       ],
//     },
//     {
//       subheader: "Concepts",
//       items: [
//         { title: "Shop", path: PATHS.page404 },
//         { title: "Product", path: PATHS.page404 },
//         { title: "Checkout", path: PATHS.page404 },
//         { title: "Posts", path: PATHS.page404 },
//         { title: "Post", path: PATHS.page404 },
//       ],
//     },
//     {
//       subheader: "Auth Demo",
//       items: [
//         { title: "Login", path: PATHS.page404 },
//         { title: "Register", path: PATHS.page404 },
//         {
//           title: "Forgot password",
//           path: PATHS.page404,
//         },
//         { title: "New password", path: PATHS.page404 },
//         { title: "Verify", path: PATHS.page404 },
//         { title: "Login (modern)", path: PATHS.page404 },
//         { title: "Register (modern)", path: PATHS.page404 },
//       ],
//     },
//     {
//       subheader: "Error",
//       items: [
//         { title: "Page 404", path: PATHS.page404 },
//         { title: "Page 405", path: PATHS.page404 },
//       ],
//     },
//   ],
// },
// ];
