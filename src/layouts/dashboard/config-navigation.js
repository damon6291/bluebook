import { useMemo } from "react";
// routes
import { PATHS } from "src/constants/routeConstants";
// locales

// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: "Menu",
        items: [
          {
            title: "Home",
            path: PATHS.dashboard,
            icon: ICONS.dashboard,
          },
          {
            title: "History",
            path: PATHS.dashboardHistory,
            icon: ICONS.order,
          },
          {
            title: "Tests",
            path: PATHS.dashboardTests,
            icon: ICONS.product,
          },
          {
            title: "Reports",
            path: PATHS.dashboardReports,
            icon: ICONS.product,
          },
          {
            title: "Students",
            path: PATHS.dashboardStudents,
            icon: ICONS.user,
          },
          {
            title: "Admins",
            path: PATHS.dashboardAdmins,
            icon: ICONS.job,
          },
        ],
      },
    ],
    []
  );

  return data;
}
