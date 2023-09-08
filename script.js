let operators = {
    "x": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b),
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
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
let result;
function calculate(e) {
    let keyPressed = e.target.innerText;
    if(keyPressed == '=') { 
        /* TODO: Show only result then similar to gcalc. */ 
    }

    // Print all inputs to display except when '=' pressed.
    updateDisplay(e);
    
    if(operatorSymbols.includes(keyPressed)) {

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
    if(secondOperand) {
        b += keyPressed;
        result = operate(a, op, b);
        updateResult(result);
        return;
    }
    a += keyPressed;

    /* 1st operand of the very first operation should be in result to 
       make line 43 to work properly.
    */
    result = a;
}

function updateResult(str) {
    resultString.textContent = str;
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    calculate(e);
}))