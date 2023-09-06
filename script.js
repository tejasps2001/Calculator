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

function updateDisplay(e) {
    displayString.textContent += e.target.innerText;
}

// Consider each keypress as first operand until secondOperand is false.
let secondOperand = false;
let operatorSymbols = Object.keys(operators);
function getOperands(e) {
    let keyPressed = e.target.innerText;
    if(keyPressed == '=') return [a, op, b];
    if(secondOperand) {
        b += keyPressed;
        return;
    }
    if(operatorSymbols.includes(keyPressed)) {
        op = keyPressed;
        secondOperand = true;
        return;
    }
    a += keyPressed;
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    let operands = getOperands(e);
    // operands returns meaningful answer only after user presses '='.
    if (operands) {
        let result = operate(...operands);
    }
    updateDisplay(e);
}))