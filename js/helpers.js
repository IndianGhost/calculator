export {
    isNumber,
    isBackspace,
    isEnterKey,
    isEligibleToAddPointFloating,
    getArithmeticOperatorHTMLCode,
    isEligibleToAddOperator,
    evaluateArithmeticOperation
}

var arithmeticOperators = { 'times': '×', 'plus': '+', 'minus': '−', 'divide': '÷' };
var evaluateOperators = {
    "times": (num1, num2) => num1 * num2,
    "plus": (num1, num2) => { if (num2 != 0) return num1 / num2; else throw 'Cannot divide by zero'; },
    "minus": (num1, num2) => num1 + num2,
    "divide": (num1, num2) => num1 - num2,
};

const isNumber = (value) => typeof Number.parseFloat(value) == 'number' && !isNaN(Number.parseFloat(value));
const isBackspace = (key) => key == 'Backspace';
const isKeyCodeFloatingPoint = (key) => key == 'NumpadDecimal' || key == 'Period';
const isEnterKey = (key) => key == 'NumpadEnter' || key == 'Enter';

const isDecimal = (value) => {
    if (isNumber(value)) {
        if (typeof value == 'string') {
            return new RegExp(/\.+/).test(value);
        }
    }
    return false;
};

const getRegexForArithmeticOperators = () => {
    // The final regex would look like [\+\×\−\÷]+
    let regex = "[";
    for (const operator of Object.values(arithmeticOperators)) {
        regex += "\\" + operator;
    }
    regex += "]+";
    return regex;
};

const getNegateRegexForArithmeticOperators = () => {
    // The final regex would look like [^\+^\×^\−^\÷]
    let regex = "[";
    for (const operator of Object.values(arithmeticOperators)) {
        regex += "^\\" + operator;
    }
    regex += "]";
    return regex;
};

const isArithmeticOperation = (value) => {
    let regexPattern = getRegexForArithmeticOperators();
    return new RegExp(regexPattern).test(value);
};

const isEligibleToAddPointFloating = (keyCode, resultScreen) => {
    if (isKeyCodeFloatingPoint(keyCode) && !isLastCharArithmeticOperator(resultScreen)) {
        if (isArithmeticOperation(resultScreen)) {
            let regex = getRegexForArithmeticOperators();
            let lastNumber = resultScreen.split(new RegExp(regex)).pop();
            return !isDecimal(lastNumber);
        }
        else if (!isDecimal(resultScreen)) {
            return true;
        }
    }
    return false;
}

const isArithmeticOperator = (value) => ['NumpadMultiply', 'NumpadAdd', 'NumpadSubtract', 'NumpadDivide'].includes(value);

const getArithmeticOperatorHTMLCode = (value) => {
    switch (value) {
        case 'NumpadMultiply': return '&times;';
        case 'NumpadAdd': return '&plus;';
        case 'NumpadSubtract': return '&minus;';
        case 'NumpadDivide': return '&divide;';
        default: throw value + ' must be an arithmetic operator';
    }
};

const isLastCharArithmeticOperator = (value) => {
    for (const operator of Object.values(arithmeticOperators))
        if (String(value).endsWith(operator)) return true;
    return false;
};

const isLastCharFloatingPoint = (value) => String(value).endsWith('.');

const isEligibleToAddOperator = (keyCode, resultScreen) => isArithmeticOperator(keyCode)
    && !isLastCharArithmeticOperator(resultScreen)
    && !isLastCharFloatingPoint(resultScreen);

const indexesOf = (array, value) => {
    let response = [];
    let indexOf = array.indexOf(value);
    while (indexOf != -1) {
        response.push(indexOf);
        indexOf = array.indexOf(value, indexOf + 1);
    }
    return response;
};

const evaluateArithmeticOperation = (expression) => {
    if (isArithmeticOperation(expression) && !isLastCharArithmeticOperator(expression)) {
        let regex = getRegexForArithmeticOperators();
        let negateRegex = getNegateRegexForArithmeticOperators();
        let numbers = expression.split(new RegExp(regex)).map(elt => Number.parseFloat(elt));
        let operators = expression.split(new RegExp(negateRegex)).filter(elt => elt);
        // TODO : code here !
        return expression;
    }
    throw expression + ' is not an arithmetic operation';
};