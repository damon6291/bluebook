import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// routes
import { PAGEHOME, PATHS } from "src/constants/routeConstants";
import { useRouter } from "src/routes/hook";
// hooks

// components
import { varHover } from "src/components/animate";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import userStore from "src/store/userStore";
import { toast } from "react-toastify";

import PersonIcon from "@mui/icons-material/Person";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: PATHS.home,
    role: [1, 2, 3],
  },
  // {
  //   label: "Profile",
  //   linkTo: PATHS.profile,
  //   role: [2],
  // },
  // {
  //   label: "Dashboard",
  //   linkTo: PATHS.dashboard,
  //   role: [1],
  // },
];

// ----------------------------------------------------------------------

export default function TestMenu() {
  const router = useRouter();

  const { user, logout } = userStore();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      logout();
      popover.onClose();
      router.replace(PAGEHOME);
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.firstName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) =>
            option.role.includes(user.role) ? (
              <MenuItem
                key={option.label}
                onClick={() => handleClickItem(option.linkTo)}
              >
                {option.label}
              </MenuItem>
            ) : null
          )}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
