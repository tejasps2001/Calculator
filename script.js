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

function getOperands() {
    let expression = new Array(1);
    let ops = Object.keys(operators);
    for (op of ops) {
        expression = displayString.textContent.split(op);
        if (expression.length > 1) break;
    }
    console.log(expression)
    return expression[0], expression[1], op;
}

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', e => {
    if (btn.innerText == '=') {
        let a = getOperands();
        console.log(a)
        let result = operate(a, op, b);
        updateResult(result);
    }
    updateDisplay(e);
}))