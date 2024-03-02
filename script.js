// elements
const btnContainer = document.querySelector('#button-container');

const display = document.querySelector('#display');

// event listeners
btnContainer.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    evt.target.blur();
  }
});

btnContainer.addEventListener('click', (evt) => {
  const clicked = evt.target;
  if (clicked.dataset.type === 'del') {
    handleDel();
  }
  if (clicked.dataset.type === 'num') {
    handleNum(clicked.dataset.value);
  }
  if (clicked.dataset.type === 'neg') {
    handleNeg();
  }
});

// global variables
const MAX_LENGTH = 14;
let currentValue = '0';
let memory = 0;
let dotActive = false;

// functions
function handleDel() {
  if (currentValue.length == 1) {
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
  if (currentValue === '0') {
    currentValue = '';
  }

  if (numValue !== '.') {
    currentValue += numValue;
  } else if (numValue === '.' && !dotActive) {
    currentValue += numValue;
    dotActive = true;
  }

  displayValue();
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

function displayValue() {
  while (currentValue.length > MAX_LENGTH) {
    currentValue = currentValue.slice(0, currentValue.length - 1);
    currentValue = (+currentValue).toString();
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
