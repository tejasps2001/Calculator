let operators = {
    "x": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
};

let allowedInputs = {
    '*': 'x', 
    '/': '÷',
    'Enter': '=',
    'Backspace': '⌫',
    '.': ".",
    '+': '+',
    '-': '-',
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
    let answer = operators[op](a, b);
    answer = Number.isInteger(answer) 
                ? answer
                : answer.toFixed(2);
    calcHistory[displayString.textContent] = answer;
    return answer;
}
let displayString = document.querySelector('#expression');
let resultString = document.querySelector('.result');

function updateDisplay(term) {
    // Print all inputs to display except when '=' pressed.
    if (term !== '=') {
        displayString.textContent += term;
    }
}

function updateResult(str) {
    resultString.textContent = str;

}

// Consider each keypress as first operand until secondOperand is false.
let secondOperand = false;
let operatorSymbols = Object.keys(operators);
let result;

function operate(term) {
    if (term == '=') {
        if (a && op && b) {
            /* TODO: Show only result then similar to gcalc. */
            displayString.setAttribute('hidden', '')
            resultString.classList.add('emphasize');
            return 'eq';
        }

        // Do nothing if '=' pressed before all inputs given.
        return;
    }

    if (operatorSymbols.includes(term)) {
        let lastCharacter = displayString.textContent.charAt
                                (displayString.textContent.length - 1);
        if (operatorSymbols.includes(lastCharacter)) return 'op';

        // Reset b to prevent concatenation to previous operands.
        b = '';

        /* The 1st operand of operations coming after the first operation
           is the result of the previous operation.
        */
        a = result;
        op = term;
        updateDisplay(term);
        secondOperand = true;
        return 'op';
    }
    if (secondOperand) {
        if (term == '.' && b.includes('.')) return;
        b += term;
        if (b == '.') {
            updateDisplay(term);
            return 'b';
        }

        // Divide by zero error.
        if (op == "÷" && Number(b) == 0) {
            updateDisplay(term);
            beSnarky();
            return 'b';
        }
        updateDisplay(term);
        result = calculate(a, op, b);
        updateResult(result);
        return 'b';
    }
    if (term == '.' && a.includes('.')) {
        return;
    }
    updateDisplay(term);
    a += term;

    /* 1st operand of the very first operation should be in result to 
       make line 43 to work properly.
    */
    result = a;
    return 'a';
}

function resetCalc() {
    a = '';
    b = '';
    displayString.removeAttribute('hidden', '');
    resultString.classList.remove('emphasize');
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

function operateCalc(term) {

    // "Disable" all buttons except AC if '=' pressed.
    if (modifiedTerm == 'eq') {
        if (term != 'AC') return;
        modifiedTerm = '';
    }
    switch (term) {
        case 'AC':
            resetCalc();
            break;
        case '⌫':
            // Return the term that precedes the deleted term.
            modifiedTerm = backspace(modifiedTerm);
            break;
        default:
            // Return the term that is added.
            modifiedTerm = operate(term);
    }
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    e.target.blur();
    operateCalc(e.target.innerText);
}))

let mapSymbols = Object.keys(allowedInputs);
window.addEventListener('keydown', e => {
    e.target.blur();
    if (mapSymbols.includes(e.key)) {
        operateCalc(allowedInputs[e.key]);
        return;
    }
    if (Number.isInteger(Number(e.key))) {
        operateCalc(e.key);
    }
    return;
})