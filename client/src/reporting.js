require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000";

exports.errorLeaf = (error) => {
  // Sometimes error.response.data.message is an error, and returning it
  // to the react component as an object instead of a list or string
  // will crash the React app. Recorded as issue #23 on Jake Gustafson
  // GitHub repo.
  // This is only known to be an issue with register.component.js getting
  // an error object for the message (if the React app doesn't
  // send a field that mongoose requires).
  var msgMsg = "";
  if (error.response) {
    msgMsg += "error.response";
    if (error.response.data) {
      msgMsg += ".data";
      if (error.response.data.message) {
        msgMsg += ".message";
      }
    }
  }
  else if (error.message) {
    msgMsg = "error.message";
  }
  else {
    msgMsg = "error.toString()";
  }
  var resMessage =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString();
  if ((typeof resMessage) != "string") {
    if (resMessage.message) {
      resMessage = resMessage.message
    }
    else {
      const errMsg = "Improperly formatted " + (resMessage.name || "Object") + " " + msgMsg;
      resMessage = errMsg + " (It should be a string but has keys): ." + Object.keys(msgMsg).join(" .");
    }
  }
  else if (resMessage.includes("Network Error") ||
           resMessage.includes("404")) {
    resMessage = API_URL + "* " + resMessage;
  }
  return resMessage;
}

exports.responseLeaf = (response) => {
  // return response.data.message;
  var msgMsg = "";
  if (response) {
    msgMsg += "response";
    if (response.data) {
      msgMsg += ".data";
      if (response.data.message) {
        msgMsg += ".message";
      }
    }
  }
  else if (response.message) {
    msgMsg = "response.message";
  }
  else {
    msgMsg = "response.toString()";
  }
  var resMessage =
    (response &&
    response.data &&
    response.data.message) ||
    response.message ||
    response.toString();
  if ((typeof resMessage) != "string") {
    if (resMessage.message) {
      // Sometimes error.response.data.message is an error, and returning it
      // to the react component as an object instead of a list or string
      // will crash the React app. Recorded as issue #23 on Jake Gustafson
      // GitHub repo
      resMessage = resMessage.message
    }
    else {
      const errMsg = "Improperly formatted " + (resMessage.name || "Object") + " " + msgMsg;
      resMessage = errMsg + " (It should be a string but has keys): ." + Object.keys(msgMsg).join(" .");
    }
  }
  return resMessage;
}