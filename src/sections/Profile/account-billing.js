// @mui
import Grid from "@mui/material/Unstable_Grid2";

//
import AccountBillingPayment from "./account-billing-payment";
import AccountBillingHistory from "./account-billing-history";
import AccountBillingAddress from "./account-billing-address";

// ----------------------------------------------------------------------

export default function AccountBilling() {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <AccountBillingPayment />

        <AccountBillingAddress />
      </Grid>

      <Grid xs={12} md={4}>
        <AccountBillingHistory />
      </Grid>
    </Grid>
  );
}
