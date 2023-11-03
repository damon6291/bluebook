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

export default function SATReviewView({ maxHeight }) {
  const { curSectionPreview } = testStore();
  const reviewPopover = usePopover();

  return (
    <>
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          height: maxHeight,
          maxHeight: maxHeight,
          bgcolor: "#fafafa",
        }}
        spacing={2}
        textAlign={"center"}
      >
        <Typography variant={"h3"} sx={{ pt: 5 }}>
          Check Your Work
        </Typography>
        <Typography variant={"body1"} fontSize={"18px"}>
          On Test day, you won't be able to move on to the next module until
          time expires.
        </Typography>
        <Typography variant={"body1"} fontSize={"18px"}>
          For these practice questions, you can click <strong>Next</strong> when
          you're ready to move on.
        </Typography>
        <Stack
          sx={{
            maxWidth: "900px",
            width: "90%",
            bgcolor: "white",
            alignSelf: "center",
            borderRadius: 1,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
            p: 3,
            textAlign: "start",
          }}
          spacing={2}
        >
          <Box display={"flex"}>
            <Typography variant={"h5"} sx={{ flexGrow: 1 }}>{`Section ${
              curSectionPreview.sectionIndex + 1
            }: ${
              curSectionPreview.category == "SATMATH"
                ? "Math"
                : "Reading and Writing"
            } Questions`}</Typography>
            <ReviewUnanswered />
            <Box sx={{ width: "10px" }} />
            <ReviewForReview />
          </Box>
          <Divider sx={{ bgcolor: "black" }} />
          <Box>
            <Box sx={{ height: "10px" }} />
            <SATReview fullScreen={true} />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
