let operators = {
    "x": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
};

let a = '';
let op = '';
let b = '';

function beSnarky() {
    let snarkyMsg = "Nice try! You can't divide by zero. 🙄"
    updateResult(snarkyMsg);
}

let calcHistory = {};

let calculate = (a, op, b) => {
    let answer = operators[op](a, b).toFixed(2);
    calcHistory[displayString.textContent] = answer;
    return answer;
}
let displayString = document.querySelector('#expression');
let resultString = document.querySelector('#result');

function updateDisplay(e) {
    // Print all inputs to display except when '=' pressed.
    if (e.target.innerText !== '=') {
        displayString.textContent += e.target.innerText;
    }
}

function updateResult(str) {
    resultString.textContent = str;

}

// Consider each keypress as first operand until secondOperand is false.
let secondOperand = false;
let operatorSymbols = Object.keys(operators);
let result;

function operate(e, keyPressed) {
    if (keyPressed == '=') {
        if (a && op && b) {
            /* TODO: Show only result then similar to gcalc. */
            return;
        }

        // Do nothing if '=' pressed before all inputs given.
        return;
    }

    if (operatorSymbols.includes(keyPressed)) {

        // Reset b to prevent concatenation to previous operands.
        b = '';

        /* The 1st operand of operations coming after the first operation
           is the result of the previous operation.
        */
        a = result;
        op = keyPressed;
        updateDisplay(e);
        secondOperand = true;
        return 'op';
    }
    if (secondOperand) {
        if (keyPressed == '.' && b.includes('.')) return;
        b += keyPressed;
        if (b == '.') {
            updateDisplay(e);
            return 'b';
        }

        // Divide by zero error.
        if (op == "÷" && Number(b) == 0) {
            beSnarky();
            return 'b';
        }
        updateDisplay(e);
        result = calculate(a, op, b);
        updateResult(result);
        return 'b';
    }
    if (keyPressed == '.' && a.includes('.')) {
        return;
    }
    updateDisplay(e);
    a += keyPressed;

    /* 1st operand of the very first operation should be in result to 
       make line 43 to work properly.
    */
    result = a;
    return 'a';
}

function resetCalc() {
    a = '';
    b = '';
    displayString.textContent = '';
    resultString.textContent = '';
    secondOperand = false;
}

function containsOperators() {
    for (symbol of operatorSymbols) {
        if (displayString.textContent.includes(symbol)) return true;
    }
    return false;
}

function backspace(modified) {
    if (modified == 'b') {
        b = b.slice(0, -1);
        displayString.textContent
            = displayString.textContent.slice(0, -1);
        if (b) {
            result = calcHistory[displayString.textContent]
            updateResult(calcHistory[displayString.textContent]);
            return 'b';
        }
        else {
            updateResult('');
            return 'op';
        }
    }
    else if (modified == 'op') {
        displayString.textContent
            = displayString.textContent.slice(0, -1);
        if (containsOperators()) {
            result = calcHistory[displayString.textContent]
            // Show the previous result.
            updateResult(calcHistory[displayString.textContent]);
            return 'b';
        }
        else {
            // this body executes when the backspace has deleted till the first operand.
            result = displayString.textContent;
            secondOperand = false;
            return 'a';
        }
    }
    else if (modified == 'a') {
        // The first operand value in 'a' is lost when line 62 
        // executes. So, take the value from calcHistory.
        displayString.textContent
            = displayString.textContent.slice(0, -1);
        if (displayString.textContent == '') {
            // reset calculator to reset variable values.
            resetCalc();
            return;
        }
        result = displayString.textContent;
        a = result;
        return 'a';
    }
    return;
}

// Define as global so as to use it in backspace() function.
let modifiedTerm;

function operateCalc(e) {
    let keyPressed = e.target.innerText;
    switch (keyPressed) {
        case 'AC':
            resetCalc();
            break;
        case '⌫':
            // Return the term that precedes the deleted term.
            modifiedTerm = backspace(modifiedTerm);
            break;
        default:
            // Return the term that is added.
            modifiedTerm = operate(e, keyPressed);
    }
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    operateCalc(e);
}))