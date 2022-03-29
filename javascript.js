const display = document.querySelector('.display');
const digits = document.querySelector('.digits');

for (let i = 1; i <= 12; i++) {
    const btn = document.createElement('button');
    btn.classList.add('digit')
    btn.setAttribute('id', i);
    btn.textContent = i;
    digits.appendChild(btn);
}

document.getElementById('10').textContent = '.';
document.getElementById('11').textContent = '0';
document.getElementById('12').textContent = '+/-'


/*--------------------------------------------------------------*/


let currentResult = null;
let latestNumber = null;
let finalRestul = null;
let operation = false;
let errorFlag = null;
let negative = 0;
let decimalFlag = 0;


/*------------------OPERATION LOGICS-------------------------*/

function sum(a, b) {
    result = (+a) + (+b)
    return parseFloat((result).toFixed(6));
}

function substract(a, b) {
    result = ((a) - (b));
    return parseFloat((result).toFixed(6));
}

function multiply(a, b) {
    result = ((a) * (b));
    return parseFloat((result).toFixed(6));
}

function divide(a, b) {
    result = ((a) / (b));
    return parseFloat((result).toFixed(6));
}

/*-------------------------------------------------------------------------------------------------------------------*/


function operate(operation, a, b) {
    if (operation === "+") return sum(a, b);
    if (operation === "-") return substract(a, b);
    if (operation === "*") return multiply(a, b);
    if (operation === "/") return divide(a, b);
}


function calculate(operationBtnEvent) {
    if (display.textContent === '' || display.textContent === '.' || display.textContent === '-') return;
    let i = display.textContent.lastIndexOf(operation)

    if (!operation || operation == '=') currentResult = parseFloat(display.textContent);
    else if (i == display.textContent.length - 1) {
        //if user has pressed an some oeprator button multiple times, do nothing
    } else {
        latestNumber = display.textContent.slice((i + 1), (display.textContent.length));
        currentResult = operate(operation, currentResult, latestNumber)
    }

    display.textContent = currentResult;
    if (!(operationBtnEvent.target.textContent == '=')) display.textContent += operationBtnEvent.target.textContent;

    operation = operationBtnEvent.target.textContent;
    decimalFlag = 0;
}


/*
Clears all data
*/
function clear() {
    display.textContent = '';
    currentResult = null;
    latestNumber = null;
    finalRestul = null;
    operation = null;
    negative = null;
}

/*
Erases the last digit from the display
*/
function erase() {
    display.textContent = display.textContent.slice(0, -1)
}

/*
Adds the pressed digit to the display.
Prevents the input of multiple decimal points. (Only one decimal point per number allowed. Decimal flag undone in the calculate function)
Also checks if the user wants a negative digit or not.
*/
function addDigit(e) {

    if (e.target.textContent === '.') {
        if (decimalFlag) return;
        else decimalFlag = 1;
    }

    if (e.target.textContent == '+/-') {
        if (negative) {
            display.textContent = display.textContent.slice(1, display.textContent.length)
            negative = 0;
        } else {
            display.textContent = '-' + display.textContent;
            negative = 1;
        }

    } else display.textContent += e.target.textContent;
}

/*---------------------------ADD EVENT LISTENERS FOR BUTTONS-----------------------------------------------------*/

document.querySelectorAll('.digit').forEach((digit) => digit.addEventListener("click", addDigit));

document.querySelector('.clear').addEventListener("click", clear);

document.querySelector('.delete').addEventListener("click", erase);

document.querySelector('.equals').addEventListener("click", operate);

document.querySelector('.operations').childNodes.forEach((operationBtn) => operationBtn.addEventListener("click", calculate));