import _ from "lodash";
import { create } from "zustand";
import testStore from "./testStore";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  studentTest: { questions: [] },
};

/*
test: {
    testId,
    sectionId,
    questions: [
        {
            questionId, 
            answer
        },
        ...
    ]
}
*/

const store = (set, get) => ({
  ...initialState,
  setStudentTest: (testId) => {
    var curSection = testStore.getState().curSectionPreview;
    var test = { testId, sectionId: curSection.id };
    var questions = [];
    curSection.questions.map((x) => {
      questions.push({
        questionId: x.id,
        answer: null,
        isReview: false,
        isABC: false,
        strikeA: false,
        strikeB: false,
        strikeC: false,
        strikeD: false,
        annotate: [],
      });
    });
    test.questions = questions;
    set({
      studentTest: test,
    });
  },
  getSessionQuestion: (questionId) => {
    var curTest = get().studentTest;
    var questions = curTest.questions.filter((x) => x.questionId == questionId);
    if (questions.length == 0) return null;
    var question = questions[0];
    return question;
  },
  setStudentAnswer: (questionId, answer) => {
    var curTest = get().studentTest;
    var question = curTest.questions.filter(
      (x) => x.questionId == questionId
    )[0];
    question.answer = answer;
    set({
      studentTest: curTest,
    });
  },
  setMarkedForReview: (questionId, bool) => {
    var curTest = get().studentTest;
    var question = curTest.questions.filter(
      (x) => x.questionId == questionId
    )[0];
    question.isReview = bool;
    set({
      studentTest: curTest,
    });
  },
  setIsABC: (questionId, bool) => {
    var curTest = get().studentTest;
    var question = curTest.questions.filter(
      (x) => x.questionId == questionId
    )[0];
    question.isABC = bool;
    set({
      studentTest: curTest,
    });
  },
  setStrike: (questionId, strike, bool) => {
    var curTest = get().studentTest;
    var question = curTest.questions.filter(
      (x) => x.questionId == questionId
    )[0];
    question[strike] = bool;
    set({
      studentTest: curTest,
    });
  },
  setAnnotate: (questionId, object) => {
    var curTest = get().studentTest;
    var question = curTest.questions.filter(
      (x) => x.questionId == questionId
    )[0];
    question.annotate.push(object);
    set({
      studentTest: curTest,
    });
  },
});

const studentStore = create(
  persist(store, {
    name: "student",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default studentStore;
