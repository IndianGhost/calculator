import { keyCodes } from "./keyCodes.js";
import * as helpers from "./helpers.js";
export {
    onClickDeleteResult,
    onKeyDownBody
}

var result = document.getElementById("js-result");

const onClickDeleteResult = () => {
    result.innerText = 0;
}

const onKeyDownBody = (event) => {
    if(result.innerText.includes('=')) {
        result.innerText = '0';
    }
    for (const keyCode in keyCodes) {
        if (event.keyCode == keyCode) {
            const element = keyCodes[keyCode];
            if (helpers.isNumber(element)) {
                result.innerText = result.innerText === "0" ? element : result.innerText + element;
            } else if (helpers.isBackspace(element)) {
                result.innerText = "0";
            } else if (helpers.isEligibleToAddPointFloating(element, result.innerText)) {
                result.innerText += '.';
            } else if (helpers.isEligibleToAddOperator(element, result.innerHTML)) {
                result.innerHTML += helpers.getArithmeticOperatorHTMLCode(element);
            } else if (helpers.isEnterKey(element)) {
                result.innerText = helpers.evaluateArithmeticOperation(result.innerText) + " =";
            }
            break;
        }
    }
};

const onClickButton = (event) => {
    result = document.getElementById("js-result");
    result.innerText = result.innerText == 0 ? event.target.innerText : result.innerText + event.target.innerText;
}