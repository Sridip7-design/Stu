/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* global jquery, pulRequest, record */

var jpdbBaseURL = "http//api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "api/iml";
var stuDBName = "SCHOOLDB";
var stuRelationName = "STUDENT-TABLE";
var connToken = "0931296|-31949327957499740|90961120";
$("#rollNo").focus();
function saveRecNo2LS(jsonObj) {
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", lvData.recno);
}

function getrollnoAsJsonObj() {
  var rollno = $("rollno").val();
  var jsonStr = {
    id: rollno
  };
  return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
  saveRecNo2LS(jsonObj);
  var data = JSON.parse(jsonObj.data).record;
  $("#fullname").val(record.name);
  $("#class").val(record.clas);
  $("#birthdate").val(record.birthday);
  $("#address").val(record.addresss);
  $("#enrollmentDate").val(record.enrol);
}
function resetForm() {
  $("#rollNo").val("");

  $("#fullName").val("");
  $("#class").val("");
  $("#birthDate").val("");
  $("#address").val("");
  $("#enrollmentDate").val("");
  $("#rollNo").prop("disabled", false);
  $("#saveButton").prop("disabled", true);
  $("#updateButton").prop("disabled", true);
  $("#resetButton").prop("disabled", true);
  $("#rollNo").focus();
}
function saveData() {
  var jsonStrObj = validateData();
  if (jsonStrObj === "") {
    return "";
  }
  var putRequest = createPUTRequest(
    connToken,
    jsonStrObj,
    stuDBName,
    stuRelationName
  );
  jquery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    pulRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jquery.ajaxSetup({ async: true });
  resetForm();
  $("#rollno").focus();
}
function validateData() {
  var rollno, fullname, classs, birthdate, address, enrollmentDate;
  rollno = $("#rollno").val();
  fullname = $("#fullname").val();
  classs = $("#class").val();
  birthdate = $("#birthdate").val();
  address = $("#address").val();
  enrollmentDate = $("#enrollmentDate").val();
  if (rollno === "") {
    alert("Roll is missing");
    $("#rollno").focus();
    return "";
  }
  if (fullname === "") {
    alert("fullname is missing");
    $("#fullname").focus();
    return "";
  }
  if (classs === "") {
    alert("class is missing");
    $("#class").focus();
    return "";
  }
  if (birthdate === "") {
    alert("birthdate is missing");
    $("#birthdate").focus();
    return "";
  }
  if (address === "") {
    alert("Roll is missing");
    $("#address").focus();
    return "";
  }
  if (enrollmentDate === "") {
    alert("EnrollmentDate is missing");
    $("#enrollmentDate").focus();
    return "";
  }
  var jsonStrObj = {
    id: rollno,
    name: fullname,
    clas: classs,
    birthday: birthdate,
    addresss: address,
    enrol: enrollmentDate
  };
  return JSON.stringify(jsonStrObj);
}
function getStudent() {
  var rollnoJsonObj = getrollnoAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    connToken,
    stuDBName,
    stuRelationName,
    rollnoJsonObj
  );
  jquery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jquery.ajaxSetup({ async: true });
  if (resJsonObj.status === 400) {
    $("#savaButton").prop("disabled", false);
    $("#resetButton").prop("disabled", false);
    $("#fullname").focus();
  } else if (resJsonObj.status === 200) {
    $("#rollno").prop("disabled", true);
    fillData(resJsonObj);
    $("#updateButton").prop("disabled", false);
    $("#fullname").focus();
  }
}
function changeData() {
  $("#updateButton").prop("disabled", true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecordRequest(
    connToken,
    jsonChg,
    stuDBName,
    stuRelationName,
    localStorage.getItem("recno")
  );
  jquery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    jpdbBaseURL,
    jpdbIML
  );
  jquery.ajaxSetup({ async: true });
  console.log(resJsonObj);
  resetForm();
  $("#rollno").focus();
}
