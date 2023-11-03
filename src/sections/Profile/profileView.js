import { useCallback, useState } from "react";
// @mui

import { Tabs, Tab, Container } from "@mui/material";
import Iconify from "src/components/iconify";
import ProfileAccount from "./profileAccount";
import AccountBilling from "./account-billing";
import AccountNotifications from "./account-notifications";
import AccountChangePassword from "./account-change-password";
import OrderListView from "./order/orderListView";

const TABS = [
  {
    value: "order",
    label: "Orders",
    icon: <Iconify icon="solar:box-bold" width={24} />,
  },
  {
    value: "general",
    label: "General",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "billing",
    label: "Billing",
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  },
  {
    value: "security",
    label: "Security",
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function ProfileView() {
  const [currentTab, setCurrentTab] = useState("order");

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {currentTab === "general" && <ProfileAccount />}

      {currentTab === "order" && <OrderListView />}

      {currentTab === "billing" && <AccountBilling />}

      {currentTab === "notifications" && <AccountNotifications />}

      {currentTab === "security" && <AccountChangePassword />}
    </Container>
  );
}
