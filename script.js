// elements
const btnContainer = document.querySelector('#button-container');

const display = document.querySelector('#display');

// global variables
const OPERATORS = ['+', '-', 'x', '/'];
const MAX_LENGTH = 15;
let currentValue = '0';
let memory = 0;
let dotActive = false;
let operand1 = 0;
let operand2 = null;

let whichOperand = 1;
let canRewrite = false;

let op = null;

// event listeners
btnContainer.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    evt.target.blur();
  }
});

btnContainer.addEventListener('click', handleCalcClicks);

// functions
function handleCalcClicks(evt) {
  const clicked = evt.target;
  if (clicked.dataset.type === 'cls') {
    handleAc();
  }
  if (clicked.dataset.type === 'del') {
    handleDel();
  }
  if (clicked.dataset.type === 'num') {
    handleNum(clicked.dataset.value);
  }
  if (clicked.dataset.type === 'neg') {
    handleNeg();
  }
  if (clicked.dataset.type === 'op') {
    handleOperator(clicked.dataset.value);
  }
  if (clicked.dataset.type === 'equal') {
    handleEqual();
  }
}

function handleAc() {
  currentValue = '0';
  memory = 0;

  operand1 = 0;
  operand2 = null;
  op = null;

  dotActive = false;
  whichOperand = 1;
  canRewrite = false;

  clearCurrentValue();
  displayValue();
}

function handleDel() {
  // when user press number then operator then del
  if (canRewrite) {
    return;
  }
  if (currentValue.length === 2 && +currentValue < 0) {
    clearCurrentValue();
  } else if (currentValue.length == 1) {
    clearCurrentValue();
  } else {
    if (currentValue.at(-1) === '.') {
      dotActive = false;
    }
    currentValue = currentValue.slice(0, currentValue.length - 1);
  }

  displayValue();
}

function handleNum(numValue) {
  if (canRewrite === true) {
    clearCurrentValue();
    canRewrite = false;
  }

  if (currentValue === '0') {
    currentValue = '';
  }

  if (numValue !== '.') {
    currentValue += numValue;
  } else if (numValue === '.' && !dotActive) {
    if (currentValue === '') {
      currentValue += '0';
    }

    currentValue += numValue;
    dotActive = true;
  }

  displayValue();
}

function handleOperator(operator) {
  // set the operator
  op = operator;

  handleEqual();
}

function handleEqual() {
  if (whichOperand === 1) {
    operand1 = +currentValue;
  } else if (whichOperand === 2) {
    operand2 = +currentValue;
  }

  whichOperand = whichOperand === 1 ? 2 : 1;
  canRewrite = true;

  if (operand1 !== null && operand2 != null && op !== null) {
    let result = null;
    switch (op) {
      case '+':
        result = add(operand1, operand2);
        break;
      case '-':
        result = subtract(operand1, operand2);
        break;
      case 'x':
        result = multiply(operand1, operand2);
        break;
      case '/':
        result = divide(operand1, operand2);
        break;
    }
    currentValue = result.toString();
    displayValue('calc');

    operand1 = null;
    operand2 = null;
    op = null;
    canRewrite = true;
  }
}

function handleNeg() {
  let currentValNum = +currentValue;
  if (!isNaN(currentValNum)) {
    currentValNum = -1 * currentValNum;
    currentValue = currentValNum.toString();
  }

  displayValue();
}

function clearCurrentValue() {
  currentValue = '0';
  dotActive = false;
}

function displayValue(mode = 'user') {
  // used to prevent the user from overflowing the display
  if (mode === 'user') {
    while (currentValue.length > MAX_LENGTH) {
      currentValue = currentValue.slice(0, currentValue.length - 1);
      currentValue = (+currentValue).toString();
    }
    // used to prevent the calculator from overflowing the display
    //  after performing the operation
  } else if (mode === 'calc') {
    while (currentValue.length > MAX_LENGTH) {
      const dotLocation = currentValue.indexOf('.');

      // try to reduce the number of digits in the fraction part
      if (!currentValue.includes('e') && dotLocation !== -1) {
        const fractionLength = currentValue.length - dotLocation - 1;
        currentValue = Number(currentValue)
          .toFixed(fractionLength - 1)
          .toString();
      } else {
        // try to reduce the whole part second
        const fractionLength = MAX_LENGTH - 7; // ["e", ".", "1", "2", "+"]
        currentValue =
          Number.parseFloat(currentValue).toExponential(fractionLength);
        break;
      }
    }
  }

  display.textContent = currentValue;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Nah';
  }
  return a / b;
}
