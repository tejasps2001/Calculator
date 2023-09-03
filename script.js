let operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "=": "equals",
};

let displayString = document.querySelector('#expression');
let result = document.querySelector('#result');
let state = 'cleanSlate';

function invokeFunction(e) {
    if (e.target.innerText == '⌫') displayString.textContent = displayString.textContent.slice(0, -1);
    if (e.target.innerText == 'AC') displayString.textContent = '';
}

let functionBtns = document.querySelectorAll('.function');
functionBtns.forEach(btn => btn.addEventListener('click', invokeFunction));

let a = null;
let op = null;
let b = null;
function calculate(e) {
    // if (op) {
    //     b = 
    //     return;
    // }
    // if (a) {

    // }
    // let displayNumber = Number(displayString);
    // if (displayNumber) a = displayNumber;
    if (result.textContent = '') {
        result.textContent = operators[op](a, b);
        let tempResult = operators[op](a, b);
        return tempResult;
    }
    result.textContent = operators[op](result, b);
    let tempResult = operators[op](tempResult, b);
    return tempResult;
}

function getLastOperand(str) {
    while (str)
}

function updateDisplay(e) {
    if (!Number(e.target.innerText) && !b) {
        a = displayString.textContent;
    }
    else if(!Number(e.target.innerText)) {
        a = b;
    }
    b = 
    displayString.textContent += e.target.innerText;
    // if ()
    // calculate(e);
}

// function activateBtn(e) {
//     updateDisplay(e);
//     // calculate(e);
// }

function activateNumberBtns() {
    let numberBtns = document.querySelectorAll('.number');
    numberBtns.forEach(btn => btn.addEventListener('click', e => {
        switch(state) {
            case 'cleanSlate':
                updateDisplay(e);
        }
    }));
}

// Activate operators except 'exemptOperators'
function activateOperators(...exemptOperators) {
    let operatorBtns = document.querySelectorAll('.operator');
    operatorBtns.forEach(btn => {
        if (exemptOperators.includes(btn.innerText)) btn.addEventListener('click', e => {
            switch(state) {
                case 'cleanSlate':
                    
            }
        });
    })
}

function cleanSlate() {
    // Activate number buttons, '-' and '.' only.
    activateNumberBtns();
    activateOperators('-', '.');
}

cleanSlate();