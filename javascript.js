const display = document.querySelector('.display');
const digits = document.querySelector('.digits');

for (let i = 1; i <= 12; i++){
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
let operation = null;
let errorFlag = null;
let negative = null;


/*------------------OPERATION LOGICS-------------------------*/

function sum(a, b) {
    result = (+a) + (+b)
    if (!Number.isInteger(result)) return result.toFixed(4);
    return result;
}

function substract(a, b) {
    result = ((a) - (b));
    if (!Number.isInteger(result)) return result.toFixed(4);
    return result;
}

function multiply(a, b) {
    result = ((a) * (b));
    if (!Number.isInteger(result)) return result.toFixed(4);
    return result;
}

function divide(a, b) {
    result = ((a) / (b));
    if (!Number.isInteger(result)) return result.toFixed(4);
    return result;
}

/*
Adds the pressed digit to the display.
Checks if the user wants a negative digit.
*/
function addDigit(e) {
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
    display.textContent = display.textContent.slice(0, display.textContent.length - 1)
}

/*--------------------------------------------------------------------------------*/

document.querySelectorAll('.digit').forEach((digit) => {
    digit.addEventListener("click", addDigit)
});

document.querySelector('.clear').addEventListener("click", clear);

document.querySelector('.delete').addEventListener("click", erase);

