import Cookies from "js-cookie";
import { JWTTOKEN } from "src/constants/textConstants";
import { APIURL } from "src/constants/apiConstants";
import { toast } from "react-toastify";
import {
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  QUESTION_RESPONSE_TYPE,
  QUESTION_VIEW_TYPE,
  SECTION_CATEGORY_GROUP_OPTIONS,
} from "src/constants/productConstants";

export const apiGetTests = async () => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Test/GetTests`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
    });
    if (response.status == 200) {
      var ret = await response.json();
      convertAllFromEnum(ret);
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiGetTest = async (id) => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Test/GetTest/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
    });
    if (response.status == 200) {
      var ret = await response.json();
      convertFromEnum(ret);
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiGetTestDetails = async (id) => {
  let result = undefined;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Test/GetTestDetails/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
    });
    if (response.status == 200) {
      var ret = await response.json();
      console.log("details is", ret);
      ret.sections.map((x) => {
        convertSectionFromEnum(x);
        x.questions.map((y) => {
          convertQuestionFromEnum(y);
          convertQuestionFromList(y);
        });
      });
      result = ret;
    }
  } catch (err) {
    toast.error(err.message);
  }
  console.log("test details result", result);
  return result;
};

export const apiDeleteTest = async (id) => {
  let result = false;
  const jwtToken = Cookies.get(JWTTOKEN);
  // TODO: if JWT token expired
  try {
    const response = await fetch(`${APIURL}Test/DeleteTest/${id}`, {
      method: "Post",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `*`,
      },
    });
    if (response.status == 200) {
      result = true;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiSaveTest = async (test) => {
  let result = 0;
  const jwtToken = Cookies.get(JWTTOKEN);
  try {
    var url = `${APIURL}Test/SaveTest`;
    const headers = {
      Authorization: `bearer ${jwtToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `*`,
    };
    convertToEnum(test);
    var data = JSON.stringify(test);

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: data,
    });
    if (response.status == 200) {
      var ret = await response.text();
      result = parseInt(ret) ?? 0;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiSaveSection = async (section) => {
  let result = 0;
  const jwtToken = Cookies.get(JWTTOKEN);
  try {
    var url = `${APIURL}Test/SaveSection`;
    const headers = {
      Authorization: `bearer ${jwtToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `*`,
    };
    convertSectionToEnum(section);
    var data = JSON.stringify(section);

    console.log("apiSaveSection data", data);

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: data,
    });
    if (response.status == 200) {
      var ret = await response.text();
      result = parseInt(ret) ?? 0;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiDeleteSection = async (id) => {
  let result = 0;
  const jwtToken = Cookies.get(JWTTOKEN);
  try {
    var url = `${APIURL}Test/DeleteSection/${id}`;
    const headers = {
      Authorization: `bearer ${jwtToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `*`,
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
    });
    if (response.status == 200) {
      result = true;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

export const apiSaveQuestion = async (question) => {
  let result = 0;
  const jwtToken = Cookies.get(JWTTOKEN);
  try {
    var url = `${APIURL}Test/SaveQuestion`;
    const headers = {
      Authorization: `bearer ${jwtToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `*`,
    };

    convertQuestionToEnum(question);
    convertQuestionAnswerToList(question);
    var data = JSON.stringify(question);

    //Need to test API call

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: data,
    });
    if (response.status == 200) {
      var ret = await response.text();
      result = parseInt(ret) ?? 0;
    }
  } catch (err) {
    toast.error(err.message);
  }
  return result;
};

const convertToEnum = (test) => {
  var enumCategory = PRODUCT_CATEGORY_GROUP_OPTIONS.find(
    (x) => x.value == test.category
  );
  if (enumCategory != undefined) test.category = enumCategory.enum;
};

const convertFromEnum = (test) => {
  var enumCategory = PRODUCT_CATEGORY_GROUP_OPTIONS.find(
    (x) => x.enum == test.category
  );
  if (enumCategory != undefined) test.category = enumCategory.value;
};

const convertAllFromEnum = (tests) => {
  var ret = [];
  tests.forEach((test) => {
    var enumCategory = PRODUCT_CATEGORY_GROUP_OPTIONS.find(
      (x) => x.enum == test.category
    );
    if (enumCategory != undefined) test.category = enumCategory.value;
    ret.push(test);
  });
  tests = ret;
};

const convertSectionToEnum = (section) => {
  var enumCategory = SECTION_CATEGORY_GROUP_OPTIONS.find(
    (x) => x.value == section.category
  );
  if (enumCategory != undefined) section.category = enumCategory.enum;
};

const convertSectionFromEnum = (section) => {
  var enumCategory = SECTION_CATEGORY_GROUP_OPTIONS.find(
    (x) => x.enum == section.category
  );
  if (enumCategory != undefined) section.category = enumCategory.value;
};

const convertQuestionToEnum = (question) => {
  var enumResponseType = QUESTION_RESPONSE_TYPE.find(
    (x) => x.value == question.responseType
  );
  if (enumResponseType != undefined)
    question.responseType = enumResponseType.enum;
  var enumViewType = QUESTION_VIEW_TYPE.find(
    (x) => x.value == question.viewType
  );
  if (enumViewType != undefined) question.viewType = enumViewType.enum;
};

const convertQuestionFromEnum = (question) => {
  var enumResponseType = QUESTION_RESPONSE_TYPE.find(
    (x) => x.enum == question.responseType
  );
  if (enumResponseType != undefined)
    question.responseType = enumResponseType.value;
  var enumViewType = QUESTION_VIEW_TYPE.find(
    (x) => x.enum == question.viewType
  );
  if (enumViewType != undefined) question.viewType = enumViewType.value;
};

export const convertQuestionAnswerToList = (question) => {
  var answers = [];
  if (question.responseType == "MCP" || question.responseType == 1) {
    answers.push({
      id: question.idA,
      questionId: question.id,
      text: question.choiceA,
      isCorrect: question.correctA,
    });
    answers.push({
      id: question.idB,
      questionId: question.id,
      text: question.choiceB,
      isCorrect: question.correctB,
    });
    answers.push({
      id: question.idC,
      questionId: question.id,
      text: question.choiceC,
      isCorrect: question.correctC,
    });
    answers.push({
      id: question.idD,
      questionId: question.id,
      text: question.choiceD,
      isCorrect: question.correctD,
    });
  } else if (question.responseType == "SA" || question.responseType == 2) {
    answers.push({
      id: question.idAnswer,
      questionId: question.id,
      text: question.answer,
      isCorrect: true,
    });
  }
  question.answers = answers;
  delete question["idA"];
  delete question["idB"];
  delete question["idC"];
  delete question["idD"];
  delete question["idAnswer"];
  delete question["choiceA"];
  delete question["choiceB"];
  delete question["choiceC"];
  delete question["choiceD"];
  delete question["correctA"];
  delete question["correctB"];
  delete question["correctC"];
  delete question["correctD"];
  delete question["answer"];
};

const convertQuestionFromList = (question) => {
  if (question.responseType == "MCP" || question.responseType == 1) {
    question.choiceA = question.answers[0].text;
    question.correctA = question.answers[0].isCorrect;
    question.idA = question.answers[0].id;
    question.choiceB = question.answers[1].text;
    question.correctB = question.answers[1].isCorrect;
    question.idB = question.answers[1].id;
    question.choiceC = question.answers[2].text;
    question.correctC = question.answers[2].isCorrect;
    question.idC = question.answers[2].id;
    question.choiceD = question.answers[3].text;
    question.correctD = question.answers[3].isCorrect;
    question.idD = question.answers[3].id;
  } else if (question.responseType == "SA" || question.responseType == 2) {
    question.answer = question.answers[0].text;
    question.idAnswer = question.answers[0].id;
  }
  delete question["answers"];
};
