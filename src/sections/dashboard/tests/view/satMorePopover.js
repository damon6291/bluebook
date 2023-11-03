import { Button, IconButton, Stack, Typography } from "@mui/material";
import { usePopover } from "src/components/custom-popover";
import CustomPopover from "src/components/custom-popover/custom-popover";
import Iconify from "src/components/iconify";
import { PATHS } from "src/constants/routeConstants";
import { useRouter } from "src/routes/hook";

const SATMorePopover = ({ stopTimer, resumeTimer }) => {
  const morePopover = usePopover();
  const router = useRouter();

  const saveExit = () => {
    if (window.confirm("Do you want to save and exit this practice Test?")) {
      // call db and save test
      router.replace(PATHS.dashboard);
    }
  };

  const listItems = [
    {
      icon: "mdi:timer-pause-outline",
      label: "Pause Timer",
      onClick: stopTimer,
    },
    {
      icon: "mdi:timer-play-outline",
      label: "Resume Timer",
      onClick: resumeTimer,
    },
    {
      icon: "material-symbols:sync-saved-locally-outline",
      label: "Save and Exit",
      onClick: saveExit,
    },
  ];

  return (
    <>
      <IconButton onClick={morePopover.onOpen}>
        <Stack alignItems={"center"} spacing={1}>
          <Iconify icon={"charm:menu-kebab"} />
          <Typography variant={"caption"}>More</Typography>
        </Stack>
      </IconButton>

      <CustomPopover
        open={morePopover.open}
        onClose={morePopover.onClose}
        sx={{
          width: 250,
          maxWidth: 250,
          p: 3,
        }}
      >
        <Stack justifyContent={"start"} display={"flex"} spacing={2}>
          {listItems.map((x, key) => {
            return (
              <Button
                key={key}
                startIcon={<Iconify icon={x.icon} />}
                sx={{ justifyContent: "start" }}
                onClick={(e) => {
                  x.onClick();
                  morePopover.onClose(e);
                }}
              >
                <Typography variant={"body2"}> {x.label} </Typography>
              </Button>
            );
          })}
        </Stack>
      </CustomPopover>
    </>
  );
};

export default SATMorePopover;
