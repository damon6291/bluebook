import _ from "lodash";
import {
  DEFAULT_QUESTION,
  DEFAULT_SECTION,
} from "src/constants/productConstants";
import {
  apiDeleteTest,
  apiGetTest,
  apiGetTestDetails,
  apiGetTests,
  apiSaveTest,
  apiSaveSection,
  apiSaveQuestion,
  convertQuestionAnswerToList,
  apiDeleteSection,
} from "src/services/testService";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  tests: [],
  curTest: {},
  curQuestion: {},
  curQuestionEdit: {},
  curSectionPreview: {},
};

const store = (set, get) => ({
  ...initialState,
  getTests: async () => {
    var curTests = get().tests;
    var res = await apiGetTests();
    if (res == null) return;
    set({
      tests: res,
    });
  },
  getTest: async (id) => {
    var tests = get().tests;
    if (tests.length == 0) {
      var res = await apiGetTest(id);
      if (res == undefined) return {};
      return res;
    }
    var ret = tests.find((elem) => elem.id == id);
    if (ret == undefined) ret = {};
    return ret;
  },
  getTestDetails: async (id) => {
    var curTest = get().curTest;
    if (_.isEmpty(curTest) || curTest.id != id) {
      var res = await apiGetTestDetails(id);
      if (res == undefined) return {};
      console.log("getTestDetails", res);
      set({
        curTest: res,
      });
      return res;
    }
  },
  getQuestion: async (testId, sectionId, questionId) => {
    var test = get().curTest;
    var curQuestion = get().curQuestion;
    if (!_.isEmpty(curQuestion) && curQuestion.id == questionId) {
      return curQuestion;
    }

    // if (_.isEmpty(test)) test = await get().getTestDetails(testId);
    // var section = test.sections.find((x) => x.id == sectionId);
    // var question = section.questions.find((x) => x.id == questionId);
    // set({
    //   curQuestion: question,
    // });
    // return question;
  },
  saveTest: async (object) => {
    var res = await apiSaveTest(object);
    if (res == 0) return 0;
    set({
      tests: [],
    });
    return res;
  },
  saveSection: async (object) => {
    var temp = JSON.parse(JSON.stringify(object));
    var res = await apiSaveSection(object);
    if (res == 0) return 0;
    var test = get().curTest;
    var guid = temp.id;
    temp.id = res;
    temp.questions = [];
    var isEdit = test.sections.find((x) => x.id == temp.id);
    if (isEdit) {
      for (const [key, value] of Object.entries(isEdit)) {
        if (temp.hasOwnProperty(key)) {
          isEdit[key] = temp[key];
        }
      }
    } else {
      var newSections = test.sections.filter((x) => x.id != guid);
      test.sections = [...newSections, temp];
    }
    console.log("save section", isEdit, temp, test);
    set({
      curTest: test,
    });

    return res;
  },
  saveQuestion: async (object) => {
    var temp = JSON.parse(JSON.stringify(object));
    var res = await apiSaveQuestion(object);
    if (res == 0) return 0;
    var test = get().curTest;
    temp.id = res;
    var section = test.sections.find((x) => x.id == temp.sectionId);
    var isEdit = section.questions.find((x) => x.id == temp.id);
    if (isEdit) {
      for (const [key, value] of Object.entries(isEdit)) {
        if (temp.hasOwnProperty(key)) {
          isEdit[key] = temp[key];
        }
      }
    } else {
      section.questions = [...section.questions, temp];
    }
    console.log("saveQuestion", test);
    set({
      curTest: test,
    });
    return res;
  },
  deleteTest: async (id) => {
    var res = await apiDeleteTest(id);
    if (!res) return false;
    var curTests = get().tests;
    var newTests = curTests.filter((x) => x.id != id);
    set({
      tests: newTests,
    });
    return true;
  },
  deleteSection: async (id) => {
    var res = await apiDeleteSection(id);
    if (!res) return false;
    var curTest = get().curTest;
    var newSections = curTest.sections.filter((x) => x.id != id);
    curTest.sections = newSections;
    set({
      curTest: curTest,
    });
    return true;
  },
  setCurQuestion: (object) => {
    var temp = JSON.parse(JSON.stringify(object));
    convertQuestionAnswerToList(temp);
    set({
      curQuestion: temp,
      curQuestionEdit: object,
    });
  },
  setSectionPreview: async (
    testId,
    sectionId,
    questionId,
    sectionIndex = -1
  ) => {
    var curTest = get().curTest;
    if (_.isEmpty(curTest) || curTest.id != testId) {
      await get().getTestDetails(testId);
    }
    var section;
    if (sectionIndex >= 0) {
      section = curTest.sections[sectionIndex];
    } else {
      section = curTest.sections.filter((x) => x.id == sectionId)[0];
    }
    var index = 0;
    if (questionId != null && questionId > 0) {
      section.questions.map((x, key) => {
        if (x.id == questionId) {
          index = key;
        }
      });
      get().setCurQuestion(section.questions[index]);
    } else if (questionId == 0) {
      // New Question
      get().setCurQuestion(DEFAULT_QUESTION);
    } else {
      //Preview all
      get().setCurQuestion(section.questions[0]);
    }
    section.index = index;
    var newSectionIndex = 0;
    if (sectionIndex >= 0) {
      newSectionIndex = sectionIndex;
    } else {
      newSectionIndex = curTest.sections.findIndex((x) => x.id == sectionId);
    }
    section.sectionIndex = newSectionIndex;
    set({
      curSectionPreview: section,
    });
    return section.questions.length == 0 ? 0 : section.questions[0].id;
  },
  removeSectionPreview: () => {
    set({
      curSectionPreview: {},
    });
  },
  moveToQuestion: (index) => {
    var sectionPreview = get().curSectionPreview;
    var question = sectionPreview.questions[index];
    get().setCurQuestion(question);
    sectionPreview.index = index;
    set({ curSectionPreview: sectionPreview });
    return question.id;
  },
  prevQuestion: () => {
    var sectionPreview = get().curSectionPreview;
    var curIndex = sectionPreview.index;
    var prevIndex = curIndex - 1;
    var question = sectionPreview.questions[prevIndex];
    get().setCurQuestion(question);
    sectionPreview.index = prevIndex;
    set({ curSectionPreview: sectionPreview });
    return question.id;
  },
  nextQuestion: () => {
    var sectionPreview = get().curSectionPreview;
    var curIndex = sectionPreview.index;
    var nextIndex = curIndex + 1;
    if (nextIndex >= sectionPreview.questions.length) {
      // if next index does not exist
      return get().setSectionPreview(
        sectionPreview.testId,
        0,
        null,
        sectionPreview.sectionIndex + 1
      );
    } else {
      var question = sectionPreview.questions[nextIndex];
      get().setCurQuestion(question);
      sectionPreview.index = nextIndex;
      set({ curSectionPreview: sectionPreview });
      return question.id;
    }
  },
  reviewQuestions: () => {
    var sectionPreview = get().curSectionPreview;
    var index = sectionPreview.questions.length;
    sectionPreview.index = index;
    set({ curSectionPreview: sectionPreview });
  },
});

const testStore = create(
  persist(store, {
    name: "test",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default testStore;
