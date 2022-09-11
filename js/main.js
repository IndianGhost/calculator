import * as handlers from "./eventHandlers.js";

/* DOM objects */
var body = document.body;
var buttons = document.getElementsByClassName("js-btn");
var deleteResult = document.getElementById("js-delete-result");

deleteResult.onclick = handlers.onClickDeleteResult;
body.onkeydown = handlers.onKeyDownBody;
for (const button of buttons) {
    button.onclick = handlers.onClickButton;
}