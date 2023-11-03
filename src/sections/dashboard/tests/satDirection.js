import { Box, Button, Typography } from "@mui/material";
import { useRef } from "react";
import CustomPopover from "src/components/custom-popover/custom-popover";
import Iconify from "src/components/iconify";

const SATDirection = ({
  directionPopover,
  directionRef,
  direction,
  windowDimensions,
}) => {
  return (
    <>
      <Button
        ref={directionRef}
        variant="text"
        endIcon={
          <Iconify
            icon={
              Boolean(directionPopover.open)
                ? "mingcute:up-line"
                : "mingcute:down-line"
            }
          />
        }
        sx={{ pl: 0 }}
        onClick={directionPopover.onOpen}
      >
        <Typography variant={"body1"} fontWeight={600}>
          Directions
        </Typography>
      </Button>
      <CustomPopover
        open={directionPopover.open}
        onClose={directionPopover.onClose}
        arrow={"top-left"}
        sx={{
          width: windowDimensions.width - 50,
          maxWidth: "1200px",
          height: windowDimensions.height - 170,
          p: 3,
          pr: 5,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{direction}</Box>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              variant="contained"
              color="warning"
              size="medium"
              sx={{
                borderRadius: 25,
                border: "0.5px solid black",
                width: "80px",
              }}
              onClick={(e) => {
                directionPopover.onClose(e);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </CustomPopover>
    </>
  );
};

export default SATDirection;
