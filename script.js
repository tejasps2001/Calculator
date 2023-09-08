let operators = {
    "x": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
};

let a = 0;
let op = '';
let b = 0;

function beSnarky() {
    let snarkyMsg = "Nice try! You can't divide by zero. 🙄"
    updateResult(snarkyMsg);
}

let calculate = (a, op, b) => operators[op](a, b);
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

    updateDisplay(e);
    if (operatorSymbols.includes(keyPressed)) {

        // Reset b to prevent concatenation to previous operands.
        b = 0;

        /* The 1st operand of operations coming after the first operation
           is the result of the previous operation.
        */
        a = result;
        op = keyPressed;
        secondOperand = true;
        return;
    }
    if (secondOperand) {
        b += keyPressed;

        // Divide by zero error.
        if (op == "÷" && Number(b) == 0) {
            beSnarky();
            return;
        }
        result = calculate(a, op, b);
        updateResult(result);
        return;
    }
    a += keyPressed;

    /* 1st operand of the very first operation should be in result to 
       make line 43 to work properly.
    */
    result = a;
}

function resetCalc() {
    a = 0;
    b = 0;
    displayString.textContent = '';
    resultString.textContent = '';
    secondOperand = false;
}

function operateCalc(e) {
    let keyPressed = e.target.innerText;
    switch(keyPressed) {
        case 'AC':
            resetCalc();
            break;
        default:
            operate(e, keyPressed);
    }
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    operateCalc(e);
}))