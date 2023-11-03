import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import testStore from "src/store/testStore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Markdown from "src/components/markdown/markdown";
import { useBoolean } from "src/hooks/use-boolean";
import Iconify from "src/components/iconify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import studentStore from "src/store/studentStore";

const QuestionView = forwardRef(
  (
    { testId, sectionId, questionId, isPreview = false, maxHeight = null },
    ref
  ) => {
    const leftIncreaseView = useBoolean(false);
    const rightIncreaseView = useBoolean(false);
    const {
      curSectionPreview,
      curQuestion,
      getQuestion,
      prevQuestion,
      nextQuestion,
    } = testStore();
    const {
      setStudentAnswer,
      setMarkedForReview,
      getSessionQuestion,
      setStrike,
      setIsABC,
    } = studentStore();

    useEffect(() => {
      (async () => {
        await getQuestion();
      })();

      return () => {
        // this now gets called when the component unmounts
      };
    }, [testId, sectionId, questionId]);

    useEffect(() => {
      var sessionQuestion = getSessionQuestion(questionId);
      if (sessionQuestion == undefined) return;
      setSelectedAnswer(sessionQuestion.answer);
      isReview.setValue(sessionQuestion.isReview);
      isABC.setValue(sessionQuestion.isABC);
      strikeA.setValue(sessionQuestion.strikeA);
      strikeB.setValue(sessionQuestion.strikeB);
      strikeC.setValue(sessionQuestion.strikeC);
      strikeD.setValue(sessionQuestion.strikeD);
    }, [curQuestion]);

    const answerSelected = (answer) => {
      setStudentAnswer(questionId, answer);
      setSelectedAnswer(answer);
    };

    const strikeChanged = (key, bool) => {
      setStrike(questionId, `strike${alphabet[key]}`, bool);
      strike[key].setValue(bool);
    };

    const getStrikeValue = (key) => {
      if (isABC.value) return strike[key].value;
      return false;
    };

    const markForReviewChanged = () => {
      setMarkedForReview(questionId, !isReview.value);
      isReview.onToggle();
    };

    const isABCCHanged = () => {
      setIsABC(questionId, !isABC.value);
      isABC.onToggle();
    };

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const isReview = useBoolean(false);
    const isABC = useBoolean(false);
    const strikeA = useBoolean(false);
    const strikeB = useBoolean(false);
    const strikeC = useBoolean(false);
    const strikeD = useBoolean(false);

    const strike = [strikeA, strikeB, strikeC, strikeD];

    useEffect(() => {
      isReview.onFalse();
      isABC.onFalse();
      strikeA.onFalse();
      strikeB.onFalse();
      strikeC.onFalse();
      strikeD.onFalse();
      setSelectedAnswer(null);
    }, []);

    const alphabet = ["A", "B", "C", "D"];

    useImperativeHandle(ref, () => ({
      setEmptyAnswer() {
        setSelectedAnswer(null);
      },
    }));

    const header = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "30px",
            width: "100%",
          }}
        >
          <Box
            height={"100%"}
            sx={{
              bgcolor: "#000",
              color: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25px",
            }}
          >
            <Typography variant="h6">{curSectionPreview.index + 1}</Typography>
          </Box>
          <Box
            width={"100%"}
            height={"100%"}
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            sx={{ px: 1, bgcolor: "#f6f6f6" }}
          >
            <Box>
              <IconButton
                onClick={() => {
                  markForReviewChanged();
                }}
              >
                <BookmarkIcon
                  sx={{
                    color: isReview.value ? "red" : "#FFFFFF",
                    stroke: "#000",
                  }}
                />
                <Typography
                  sx={{ pl: 1, fontWeight: isReview.value ? 700 : 400 }}
                  color={"black"}
                >
                  Mark for Review
                </Typography>
              </IconButton>
            </Box>
            <IconButton
              sx={{
                border: "1px solid black",
                borderRadius: 1,
                height: "90%",
                bgcolor: isABC.value ? "blue" : "white",
                color: isABC.value ? "white" : "black",
                ":hover": {
                  bgcolor: isABC.value ? "blue" : "white",
                  color: isABC.value ? "white" : "black",
                },
              }}
              onClick={() => {
                isABCCHanged();
              }}
            >
              <Iconify icon={"mdi:abc-off"} width={25} height={25} />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: "dashed", borderBottomWidth: 5 }} />
      </>
    );

    const QuestionButton = ({ x, index }) => {
      return (
        <Button
          key={index}
          variant="outlined"
          onClick={() => {
            answerSelected(index);
            if (strike[index].value) {
              strikeChanged(index, false);
            }
          }}
          startIcon={
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: "#FFF",
                color: "#000",
                border: getStrikeValue(index)
                  ? "1.5px solid grey"
                  : "1.5px solid black",
                bgcolor: selectedAnswer == index ? "blue" : "inherit",
                color:
                  selectedAnswer == index
                    ? "white"
                    : getStrikeValue(index)
                    ? "grey"
                    : "black",
                textDecoration: getStrikeValue(index) ? "line-through" : "none",
              }}
            >
              <Typography variant="body2">
                &nbsp;&nbsp;&nbsp;{alphabet[index]}
                &nbsp;&nbsp;&nbsp;
              </Typography>
            </Avatar>
          }
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            p: 1,
            px: 3,
            border: `1px solid ${
              index == selectedAnswer
                ? "blue"
                : getStrikeValue(index)
                ? "grey"
                : "black"
            }`,
            textAlign: "start",
            boxShadow: index == selectedAnswer ? "0 0 0 0.5px currentColor" : 0,
            width: "100%",
            transition: "none",
            "&:hover": {
              bgcolor: "white",
              borderColor: index == selectedAnswer ? "blue" : "inherit",
              boxShadow:
                index == selectedAnswer ? "0 0 0 0.5px currentColor" : 0,
              textDecoration: getStrikeValue(index) ? "line-through" : "none",
            },
            textDecoration: getStrikeValue(index) ? "line-through" : "none",
          }}
        >
          <Markdown
            sx={{ pl: 1, color: getStrikeValue(index) ? "grey" : "inherit" }}
            children={x.text}
          />
        </Button>
      );
    };

    const questionView = (
      <Stack spacing={2} sx={{ pt: 1 }}>
        {curQuestion.answers.map((x, key) => {
          if (isABC.value) {
            return (
              <Grid container alignItems={"center"} key={key}>
                <Grid item xs={11}>
                  <QuestionButton x={x} index={key} />
                </Grid>
                <Grid item xs={1} display={"flex"} justifyContent={"center"}>
                  {strike[key].value ? (
                    <Box
                      sx={{
                        width: 25,
                        height: 25,
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        strikeChanged(key, !strike[key].value);
                      }}
                    >
                      <Typography sx={{ fontWeight: 700 }}>Undo</Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        border: "1px solid black",
                        borderRadius: 25,
                        width: 25,
                        height: 25,
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "line-through",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        strikeChanged(key, !strike[key].value);
                        if (selectedAnswer === key) {
                          answerSelected(null);
                        }
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;{alphabet[key]}
                      &nbsp;&nbsp;&nbsp;
                    </Box>
                  )}
                </Grid>
              </Grid>
            );
          }
          return <QuestionButton x={x} index={key} key={key} />;
        })}
      </Stack>
    );

    //SINGLE
    const verticalView = (
      <Container>
        {header}
        <Markdown sx={{ pt: 1 }} children={curQuestion.questionParagraph} />
        <Markdown sx={{ pt: 1 }} children={curQuestion.questionText} />
        {questionView}
      </Container>
    );

    //DOUBLE
    const horizontalView = (
      <Grid container>
        <Grid
          item
          xs={leftIncreaseView.value ? 8.5 : rightIncreaseView.value ? 3 : 5.75}
          sx={{
            maxHeight: maxHeight ? `${maxHeight}px` : "100%",
            height: maxHeight ? `${maxHeight}px` : "100%",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <Stack>
            <IconButton
              sx={{
                alignSelf: "end",
                border: "1px solid #f0f0f0",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                mb: 0.5,
                m: 1,
              }}
              onClick={() => {
                leftIncreaseView.onToggle();
                rightIncreaseView.onFalse();
              }}
            >
              <Iconify
                icon={"mingcute:expand-player-line"}
                rotate={2}
                vFlip={leftIncreaseView.value ? false : true}
                hFlip={leftIncreaseView.value ? true : false}
                width={25}
                height={25}
              />
            </IconButton>
            <Markdown sx={{ pt: 1 }} children={curQuestion.questionParagraph} />
          </Stack>
        </Grid>
        <Grid item xs={0.5} sx={{ display: "flex", justifyContent: "center" }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: maxHeight ? `${maxHeight}px` : "100%",
              borderRightWidth: 5,
            }}
          />
        </Grid>
        <Grid
          item
          xs={leftIncreaseView.value ? 3 : rightIncreaseView.value ? 8.5 : 5.75}
          sx={{
            maxHeight: maxHeight ? `${maxHeight}px` : "100%",
            height: maxHeight ? `${maxHeight}px` : "100%",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <IconButton
            sx={{
              alignSelf: "end",
              border: "1px solid #f0f0f0",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
              mb: 0.5,
              m: 1,
            }}
            onClick={() => {
              leftIncreaseView.onFalse();
              rightIncreaseView.onToggle();
            }}
          >
            <Iconify
              icon={"mingcute:expand-player-line"}
              rotate={rightIncreaseView.value ? 2 : 0}
              width={25}
              height={25}
            />
          </IconButton>
          <Container>
            {header}
            <Markdown sx={{ pt: 1 }} children={curQuestion.questionText} />
            {questionView}
          </Container>
        </Grid>
      </Grid>
    );

    const preview = (
      <Grid container>
        <Grid item xs={1} display={"flex"} alignItems={"center"}>
          {curQuestion.id > 0 && curSectionPreview.index != 0 ? (
            <IconButton onClick={() => prevQuestion()} sx={{ height: "100%" }}>
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : null}
        </Grid>
        {curQuestion.viewType == "DOUBLE" && (
          <Grid item xs={10}>
            {horizontalView}
          </Grid>
        )}
        {curQuestion.viewType == "SINGLE" && (
          <Grid item xs={10}>
            {verticalView}
          </Grid>
        )}
        <Grid item xs={1} display={"flex"} alignItems={"center"}>
          {curQuestion.id > 0 &&
          curSectionPreview.index + 1 != curSectionPreview.questions.length ? (
            <IconButton onClick={() => nextQuestion()} sx={{ height: "100%" }}>
              <ArrowForwardIosIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    );

    const testView = (
      <Grid container>
        {curQuestion.viewType == "DOUBLE" && (
          <Grid
            item
            xs={12}
            sx={{
              px: 3,
            }}
          >
            {horizontalView}
          </Grid>
        )}
        {curQuestion.viewType == "SINGLE" && (
          <Grid
            item
            xs={12}
            sx={{
              px: 3,
              py: "50px",
              maxHeight: maxHeight ? `${maxHeight}px` : "100%",
              height: maxHeight ? `${maxHeight}px` : "100%",
              overflowY: "scroll",
            }}
          >
            {verticalView}
          </Grid>
        )}
      </Grid>
    );

    return <>{isPreview ? preview : testView}</>;
  }
);

export default QuestionView;
