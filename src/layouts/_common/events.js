import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
// routes
import { PATHS } from "src/constants/routeConstants";
// components
import Iconify from "src/components/iconify";
import { RouterLink } from "src/routes/components";
import eventStore from "src/store/eventStore";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { bgBlur } from "src/theme/css";
import { EVENT } from "../config-layout";
import { useResponsive } from "src/hooks/use-responsive";

// ----------------------------------------------------------------------

export default function EventBanner() {
  const { showMainEvent, setShowMainEvent } = eventStore();
  const theme = useTheme();
  return (
    <>
      {showMainEvent && (
        <Box
          sx={{
            p: 1,
            ...bgBlur({
              color: theme.palette.primary.main,
              opacity: 1,
            }),
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ color: "common.white", flexGrow: 1 }}>
              2023 섬머 캠프
            </Typography>

            <Button variant={"contained"} href={PATHS.home}>
              바로 가기
            </Button>
            <IconButton onClick={() => setShowMainEvent(false)}>
              <Iconify
                color={"common.white"}
                icon="eva:close-fill"
                width={24}
              />
            </IconButton>
          </Container>
        </Box>
      )}
    </>
  );
}

EventBanner.propTypes = {};
