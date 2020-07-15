const display = document.querySelector('#display');
const equalButton = document.querySelector('#equal');
const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

let operator = '';
let severalOperators = false;
let firstNumber = '';
let secondNumber = '';
let displayArray = [];


function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return Number(num1) + Number(num2);
            break;
        case '-':
            return num1 - num2;
            break;
        case '*':
            return num1 * num2;
            break;
        case '/':
            return num1 / num2;
            break; 
    }
}


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (severalOperators){
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }else{
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        } 
        if (firstNumber.includes('.') || secondNumber.includes('.')){
            document.getElementById('dot').disabled = true;
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        let result;
        if (severalOperators){
            result = operate(operator, firstNumber, secondNumber);
            display.textContent = result;
            firstNumber = result;
            secondNumber = '';
        }
        severalOperators = true;
        operator = button.textContent;
        console.log(firstNumber)
        console.log(secondNumber)
    })
})

equalButton.addEventListener('click', () => {
    result = operate(operator, firstNumber, secondNumber);
    if (result.toString().length > 5){
        result = Math.round(result * 100) / 100;
    };
    display.textContent = result;
    firstNumber = result;
    secondNumber = '';
})

clearButton.addEventListener('click', () => {
    operator = '';
    severalOperators = false;
    firstNumber = '';
    secondNumber = '';
    display.textContent = '0';
    document.getElementById('dot').disabled = false;
    displayArray = [];
})

backspaceButton.addEventListener('click', () => { 
    if(display.textContent === firstNumber){
        firstNumber = firstNumber.substring(0, firstNumber.length -1);
        display.textContent = firstNumber;
    }else if (display.textContent === secondNumber){
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        display.textContent = secondNumber;
    }
})