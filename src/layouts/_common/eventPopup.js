import PropTypes from "prop-types";
import { m, AnimatePresence } from "framer-motion";
// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";

// components
import Iconify from "src/components/iconify";
import { varFade } from "src/components/animate";
import { IconButton } from "@mui/material";
import { useBoolean } from "src/hooks/use-boolean";
import { PATHS } from "src/constants/routeConstants";

// ----------------------------------------------------------------------

export default function EventPopup() {
  const open = useBoolean(true);

  const renderContent = (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", pr: 1, pt: 1 }}>
        <IconButton onClick={() => open.onFalse()}>
          <Iconify icon="eva:close-fill" width={24} />
        </IconButton>
      </Box>
      <Stack
        spacing={5}
        sx={{
          m: "auto",
          maxWidth: 480,
          textAlign: "center",
          p: 5,
        }}
      >
        <Typography variant="h4">We have an Event</Typography>

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => open.onFalse()}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            No Thanks
          </Button>

          <Button
            fullWidth
            size="large"
            variant="contained"
            href={PATHS.products}
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            Go to Event
          </Button>
        </Stack>
      </Stack>
    </>
  );

  return (
    <AnimatePresence>
      <Dialog
        open={open.value}
        PaperComponent={(props) => (
          <Box
            component={m.div}
            {...varFade({
              distance: 120,
              durationIn: 0.32,
              durationOut: 0.24,
              easeIn: "easeInOut",
            }).inUp}
            sx={{
              width: 1,
              height: 1,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper {...props}>{props.children}</Paper>
          </Box>
        )}
      >
        {renderContent}
      </Dialog>
    </AnimatePresence>
  );
}

EventPopup.propTypes = {};
