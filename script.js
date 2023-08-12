const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const substractBtn = document.getElementById('substract-button');
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');

// Initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// Example = 2 + 3
// operation = +
// previousOperants = 2
// result = 5

// Funtion to append number
const appendNumber = (number) => {
    if(number === '.' && result.includes('.')){
        return;
    }
    result += number;
    updateDisplay();
}

// Function to update display
const updateDisplay = () => {
    if(operation) {
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else {
        resultElement.innerText = result;
    }
}

// Function to select operator
const selectOperator = (operatorValue) => {
    if(result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// Function to calculate result
const calculateResult = () => {
    let evalutedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evalutedResult = prev + current;
            break;
        case '-':
            evalutedResult = prev - current;
            break;
        case '*':
            evalutedResult = prev * current;
            break;
        case '/':
            evalutedResult = prev / current;
            break;  
        default:
            break;
    }

    result = evalutedResult.toString();
    operation = '';
    previousOperand = '';

}


// Add event listener to number button
numberBtns.forEach(button => {
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
    });
});

// funtion to clear display
const clearDisplay = () => {

    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

const deleteLastDigit = () => {
    if(result === '') return;
    result = result.slice(0, -1);
    updateDisplay();
}

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
substractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', () => {
    if(result === '') return;
    calculateResult();
    updateDisplay();

});

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
