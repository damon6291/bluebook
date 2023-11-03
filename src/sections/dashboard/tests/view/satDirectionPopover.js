import { Box, Stack, Typography } from "@mui/material";
import SATDirection from "../satDirection";
import TeX from "@matejmazur/react-katex";
import Image from "src/components/image/image";

// ----------------------------------------------------------------------

export default function SATDirectionPopover({
  directionPopover,
  directionRef,
  windowDimensions,
  category,
}) {
  const satReadingDirection = (
    <Stack spacing={1} sx={{ pt: 1 }}>
      <Typography variant={"body1"} fontSize={"18px"}>
        The questions in this section address a number of important reading and
        writing skills. Each question includes one or more passages, which may
        include a table or graph. Read each passage and question carefully, and
        then choose the best answer to the question based on the passage(s).
      </Typography>
      <Typography variant={"body1"} fontSize={"18px"}>
        All questions in this section are multiple-choice four answer choices.
        Each has a single best answer.
      </Typography>
    </Stack>
  );

  const satMathDirection = (
    <Stack spacing={1} sx={{ pt: 1 }}>
      <Typography variant={"body1"} fontSize={"18px"}>
        The questions in this section address a number of important math skills
      </Typography>
      <Typography variant={"body1"} fontSize={"18px"}>
        Use of a calculator is permitted for all questions. A reference sheet,
        calculator, and these directions can be accessed throughout the test
      </Typography>
      <Typography variant={"body1"} fontSize={"18px"}>
        Unless otherwise indicated:
      </Typography>
      <ul style={{ margin: 0 }}>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            All variables and expressions represent real numbers
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            Figures provided are drawn to scale
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            All figures lie in a plane
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            The domain of a given function <TeX math={"f"} /> is the set of all
            real number <TeX math={"x"} /> for which{" "}
            <strong style={{ fontWeight: 700 }}>
              <TeX math={"f(x)"} />
            </strong>{" "}
            is a real number
          </Typography>
        </li>
      </ul>
      <Typography variant={"body1"} fontSize={"18px"}>
        For{" "}
        <strong style={{ fontWeight: 700 }}>multiple-choice questions,</strong>{" "}
        solve each problem and choose the correct answer from the choices
        provided. Each multiple-choice question has a single correct answer
      </Typography>
      <Typography variant={"body1"} fontSize={"18px"}>
        For{" "}
        <strong style={{ fontWeight: 700 }}>
          student-produced response questions,
        </strong>{" "}
        solve each problem and enter your answer as described below.
      </Typography>
      <ul style={{ margin: 0 }}>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            If you find <strong style={{ fontWeight: 700 }}></strong>more than
            one correct answer, enter only one answer.
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            You can enter up to 5 characters for a{" "}
            <strong style={{ fontWeight: 700 }}>positive</strong> answer and up
            to 6 characters (including the negative sign) for a{" "}
            <strong style={{ fontWeight: 700 }}>negative</strong> answer.
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            If your answer is a{" "}
            <strong style={{ fontWeight: 700 }}>fraction</strong> that doesn't
            fit in the provided space, enter the decimal equivalent.
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            If your answer is a{" "}
            <strong style={{ fontWeight: 700 }}>decimal</strong> that doesn't
            fit in the provided space, enter it by truncating or rounding at the
            fourth digit.
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            If your answer is a{" "}
            <strong style={{ fontWeight: 700 }}>mixed number</strong> (such as{" "}
            <TeX math="3\frac{1}{2}" />
            ), enter is as an improper fraction (7/2) or its decimal equivalent
            (3.5).
          </Typography>
        </li>
        <li>
          <Typography variant={"body1"} fontSize={"18px"}>
            Don't enter <strong style={{ fontWeight: 700 }}>symbols</strong>{" "}
            such as a percent sign, comma, or dollar sign.
          </Typography>
        </li>
      </ul>
      <Box sx={{ height: "15px" }} />
      <Box>
        <Image
          alt="Math Direction"
          src="/satAssets/math/direction.png"
          ratio="16/9"
        />
      </Box>
    </Stack>
  );

  const directions = [
    { category: "SATREADING", direction: satReadingDirection },
    { category: "SATMATH", direction: satMathDirection },
  ];
  return (
    <SATDirection
      directionPopover={directionPopover}
      directionRef={directionRef}
      direction={directions.find((x) => x.category == category).direction}
      windowDimensions={windowDimensions}
    />
  );
}
