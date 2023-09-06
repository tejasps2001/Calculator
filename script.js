let operators = {
    "x": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};

let a = 0;
let op = '';
let b = 0;

let operate = (a, op, b) => operators[op](a, b);
let displayString = document.querySelector('#expression');
let resultString = document.querySelector('#result');

function updateDisplay(e) {
    displayString.textContent += e.target.innerText;
}

// Consider each keypress as first operand until secondOperand is false.
let secondOperand = false;
let operatorSymbols = Object.keys(operators);
function getOperands(e) {
    let keyPressed = e.target.innerText;
    if(keyPressed == '=') return [a, op, b];
    // print all inputs to display except when '=' pressed.
    updateDisplay(e);
    if(secondOperand) {
        b += keyPressed;
        let result = operate(a, op, b);
        updateResult(result);
        return;
    }
    if(operatorSymbols.includes(keyPressed)) {
        op = keyPressed;
        secondOperand = true;
        return;
    }
    a += keyPressed;
}

function updateResult(str) {
    resultString.textContent = str;
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    getOperands(e);
}))