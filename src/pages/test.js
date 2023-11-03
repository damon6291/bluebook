import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import AnnotateButton from "src/components/annotate";
import { usePopover } from "src/components/custom-popover";
import CustomPopover from "src/components/custom-popover/custom-popover";
import Iconify from "src/components/iconify";
import Timer from "src/components/timer/timer";
import { useBoolean } from "src/hooks/use-boolean";
import { useParams, useRouter } from "src/routes/hook";
import QuestionView from "src/sections/dashboard/tests/questionView";
import SATDirectionPopover from "src/sections/dashboard/tests/view/satDirectionPopover";
import SATHighlightView from "src/sections/dashboard/tests/view/satHighlightView";
import SATMorePopover from "src/sections/dashboard/tests/view/satMorePopover";
import SATReviewPopover from "src/sections/dashboard/tests/view/satReviewPopover";
import SATReviewView from "src/sections/dashboard/tests/view/satReviewView";
import TestIntroduction from "src/sections/dashboard/tests/view/testIntroduction";
import loadingStore from "src/store/loadingStore";
import studentStore from "src/store/studentStore";
import testStore from "src/store/testStore";
import userStore from "src/store/userStore";
import TeX from "@matejmazur/react-katex";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const questionViewRef = useRef();
  const isHideTime = useBoolean(false);
  const firstStartTest = useBoolean(true);
  const directionRef = useRef();
  const directionPopover = usePopover();
  const timerRef = useRef();
  const isTimerStopped = useBoolean(false);
  const [highlightPreviewText, setHighlightPreviewText] = useState("");
  const annotationRef = useRef();
  const { setIsLoading, isLoading } = loadingStore();

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const { testId } = params;

  const { user } = userStore();
  const { setStudentTest, studentTest } = studentStore();
  const {
    curTest,
    curSectionPreview,
    curQuestion,
    getTestDetails,
    setSectionPreview,
    nextQuestion,
    prevQuestion,
    reviewQuestions,
  } = testStore();

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function onBackButtonEvent() {
      if (window.confirm("Are you sure you want to exit the test?")) {
        router.back();
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    }
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const clickedHighlightedText = (text, id) => {
    setHighlightPreviewText(text);
  };

  useEffect(() => {
    getTestDetails(Number(testId));
  }, []);

  useEffect(() => {
    (async () => {
      if (
        !_.isEmpty(curTest) &&
        (_.isEmpty(curSectionPreview) ||
          curSectionPreview.testId != Number(testId))
      ) {
        await setSectionPreview(Number(testId), 0, null, 0);
        setStudentTest(Number(testId));
      } else {
        firstStartTest.onFalse();
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [curTest]);

  const header = (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 1,
        overflowY: "hidden",
        maxHeight: "100px",
      }}
    >
      <Grid item xs={4}>
        <Typography variant={"h5"}>
          Section {curSectionPreview.sectionIndex + 1} :{" "}
          {curSectionPreview.category == "SATMATH"
            ? "Math"
            : "Reading and Writing"}
        </Typography>
        <SATDirectionPopover
          directionPopover={directionPopover}
          directionRef={directionRef}
          windowDimensions={windowDimensions}
          category={curSectionPreview.category}
        />
      </Grid>
      <Grid item xs={4} display={"flex"} justifyContent={"center"}>
        <Stack alignItems={"center"} spacing={1}>
          {isHideTime.value ? (
            <Iconify icon={"icon-park-outline:timer"} sx={{ height: "30px" }} />
          ) : (
            <Timer ref={timerRef} timeInMinutes={curSectionPreview.timeLimit} />
          )}

          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: "black" }}
            onClick={() => isHideTime.onToggle()}
          >
            {isHideTime.value ? "Show" : "Hide"}
          </Button>
        </Stack>
      </Grid>
      {curSectionPreview.category === "SATREADING" ? (
        <Grid item xs={4} display={"flex"} flexDirection={"row-reverse"}>
          <SATMorePopover
            stopTimer={() => {
              timerRef.current.stop();
              isTimerStopped.onTrue();
            }}
            resumeTimer={() => {
              timerRef.current.resume();
              isTimerStopped.onFalse();
            }}
          />

          <AnnotateButton
            questionId={curQuestion.id}
            parentId={"testBody"}
            onClickHighlightedRow={clickedHighlightedText}
            ref={annotationRef}
          />
        </Grid>
      ) : curSectionPreview.category === "SATMATH" ? (
        <Grid item xs={4} display={"flex"} flexDirection={"row-reverse"}>
          <SATMorePopover
            stopTimer={() => {
              timerRef.current.stop();
              isTimerStopped.onTrue();
            }}
            resumeTimer={() => {
              timerRef.current.resume();
              isTimerStopped.onFalse();
            }}
          />
          <IconButton onClick={() => {}}>
            <Stack alignItems={"center"} spacing={1}>
              <Iconify icon={"tabler:route-x-2"} />
              <Typography variant={"caption"}>Reference</Typography>
            </Stack>
          </IconButton>
          <IconButton onClick={() => {}}>
            <Stack alignItems={"center"} spacing={1}>
              <Iconify icon={"icons8:calculator"} />
              <Typography variant={"caption"}>Calculator</Typography>
            </Stack>
          </IconButton>
        </Grid>
      ) : null}
    </Grid>
  );

  const body = (
    <Box
      id={"testBody"}
      sx={{
        bgcolor: Boolean(directionPopover.open) ? "#d9d9d9" : "inherit",
        // maxHeight: windowDimensions.height - 170,
        // overflowY: "scroll",
      }}
    >
      {isTimerStopped.value ? (
        <Box
          height={windowDimensions.height - 170}
          bgcolor={"black"}
          zIndex={99}
          top={0}
        ></Box>
      ) : null}
      {!_.isEmpty(studentTest) &&
      !_.isEmpty(curSectionPreview) &&
      !isTimerStopped.value ? (
        <>
          <Box
            display={
              curSectionPreview.index == curSectionPreview.questions.length
                ? "none"
                : "block"
            }
          >
            <QuestionView
              testId={Number(testId)}
              sectionId={curSectionPreview.id}
              questionId={curQuestion.id}
              isPreview={false}
              maxHeight={windowDimensions.height - 170}
              ref={questionViewRef}
            />
          </Box>
          {curSectionPreview.index == curSectionPreview.questions.length ? (
            <SATReviewView maxHeight={windowDimensions.height - 170} />
          ) : null}
        </>
      ) : null}
    </Box>
  );

  const footer = (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 1,
        bottom: 0,
        position: "relative",
        overflowY: "hidden",
        maxHeight: "70px",
        height: "70px",
      }}
    >
      <Grid item xs={4}>
        {firstStartTest.value ? null : (
          <Typography
            variant={"h5"}
          >{`${user.firstName} ${user.lastName}`}</Typography>
        )}
      </Grid>
      <Grid item xs={4} display={"flex"} justifyContent={"center"}>
        {firstStartTest.value ? null : (
          <>
            {curSectionPreview.index != curSectionPreview.questions.length ? (
              <SATReviewPopover />
            ) : null}
          </>
        )}
      </Grid>
      <Grid item xs={4} display={"flex"} flexDirection={"row-reverse"}>
        <Stack direction="row" spacing={1}>
          {firstStartTest.value ? (
            <Button
              variant="contained"
              onClick={() => {
                router.back();
              }}
              sx={{ borderRadius: 25, bgcolor: "blue" }}
            >
              Back
            </Button>
          ) : null}
          {curSectionPreview.index != 0 && (
            <Button
              variant="contained"
              onClick={() => {
                questionViewRef.current.setEmptyAnswer();
                annotationRef.current.removeAllHighlights();
                prevQuestion();
              }}
              sx={{ borderRadius: 25, bgcolor: "blue" }}
            >
              Back
            </Button>
          )}
          {firstStartTest.value ? (
            <Button
              variant="contained"
              onClick={() => {
                firstStartTest.onFalse();
                directionRef.current.click();
              }}
              sx={{ borderRadius: 25, bgcolor: "blue" }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={async () => {
                // var temp = document
                //   .getElementById("testBody")
                //   .getElementsByTagName("mark");
                // while (temp[0]) temp[0].parentNode.removeChild(temp[0]);
                // annotationRef.current.removeAllHighlights();
                if (
                  curSectionPreview.index == curSectionPreview.questions.length
                ) {
                  // if review screen
                  if (
                    curSectionPreview.sectionIndex ==
                    curTest.sections.length - 1
                  ) {
                    // if last section (review screen) need to end test
                    toast.success("test ended");
                  } else {
                    // need to move to next section
                    setIsLoading(true);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    nextQuestion();
                    setStudentTest(testId);
                    directionRef.current.click();
                    setIsLoading(false);
                  }
                } else if (
                  curSectionPreview.index ==
                  curSectionPreview.questions.length - 1
                ) {
                  // last question of section
                  reviewQuestions();
                } else {
                  // any question except last one
                  nextQuestion();
                }
              }}
              sx={{ borderRadius: 25, bgcolor: "blue" }}
            >
              Next
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Helmet>
        <title> Test </title>
      </Helmet>
      <Box>
        {firstStartTest.value ? (
          <Stack>
            <TestIntroduction maxHeight={windowDimensions.height - 80} />
            <Divider sx={{ borderBottomWidth: 2 }} />
            {footer}
          </Stack>
        ) : null}
        {!_.isEmpty(curSectionPreview) ? (
          <Stack sx={{ display: firstStartTest.value ? "none" : "flex" }}>
            {header}
            <Divider sx={{ borderStyle: "dashed", borderBottomWidth: 5 }} />
            {body}
            <Divider sx={{ borderStyle: "dashed", borderBottomWidth: 5 }} />
            {footer}
          </Stack>
        ) : null}
        <SATHighlightView
          highlightedText={highlightPreviewText}
          onClose={() => setHighlightPreviewText("")}
          removeHighlight={() => {
            annotationRef.current.unhighlightText();
            setHighlightPreviewText("");
          }}
        />
      </Box>
    </>
  );
}
