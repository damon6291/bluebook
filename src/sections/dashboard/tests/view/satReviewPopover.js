import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { usePopover } from "src/components/custom-popover";
import CustomPopover from "src/components/custom-popover/custom-popover";
import Iconify from "src/components/iconify";
import testStore from "src/store/testStore";
import SATReview, {
  ReviewCurrent,
  ReviewForReview,
  ReviewUnanswered,
} from "../satReview";

export default function SATReviewPopover() {
  const { curSectionPreview } = testStore();
  const reviewPopover = usePopover();

  return (
    <>
      <Button
        variant="contained"
        size="large"
        endIcon={<Iconify icon={"mingcute:up-fill"} />}
        sx={{ bgcolor: "black", height: "40px" }}
        onClick={reviewPopover.onOpen}
      >{`Question ${curSectionPreview.index + 1} of ${
        curSectionPreview.questions.length
      }`}</Button>
      <CustomPopover
        open={reviewPopover.open}
        onClose={reviewPopover.onClose}
        arrow={"bottom-center"}
        sx={{
          width: "550px",
          maxWidth: "550px",
          p: 3,
          mb: 10,
        }}
      >
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          spacing={2}
          textAlign={"center"}
        >
          <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
            <Typography variant={"h5"} sx={{ flexGrow: 1 }}>{`Section ${
              curSectionPreview.sectionIndex + 1
            }: ${
              curSectionPreview.category == "SATMATH"
                ? "Math"
                : "Reading and Writing"
            } Questions`}</Typography>
            <IconButton sx={{ ml: "auto" }} onClick={reviewPopover.onClose}>
              <Iconify color={"black"} icon={"ph:x-bold"} />
            </IconButton>
          </Box>
          <Box>
            <Divider sx={{ bgcolor: "black" }} />
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              paddingX={5}
              paddingY={1}
            >
              <ReviewCurrent />
              <ReviewUnanswered />
              <ReviewForReview />
            </Box>
            <Divider sx={{ bgcolor: "black" }} />
          </Box>
          <Box>
            <Box height={"10px"} />
            <SATReview onClose={reviewPopover.onClose} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                borderRadius: 25,
                border: "0.5px solid blue",
                color: "blue",
              }}
              onClick={(e) => {
                reviewPopover.onClose(e);
              }}
            >
              Go to Review Page
            </Button>
          </Box>
        </Stack>
      </CustomPopover>
    </>
  );
}
