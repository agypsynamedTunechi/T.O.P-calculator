const numberDisplay = document.querySelector("#number-display");
// const totalDisplay = document.querySelector("#total");
const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");

function add(a, b) {
  let total = Number(a) + Number(b);
  return total;
}

function subtract(a, b) {
  let total = Number(a) - Number(b);
  return total;
}

function divide(a, b) {
  let total = Number(a) / Number(b);
  return total;
}

function multiply(a, b) {
  let total = Number(a) * Number(b);
  return total;
}

function modulus(a, b) {
  let total = Number(a) % Number(b);
  return total;
}

let firstNum = "";
let secondNum = "";
let operator = "";

function operate(num1, op, num2) {
  switch (op) {
    case "+":
      numberDisplay.textContent = add(num1, num2);
      break;

    case "-":
      numberDisplay.textContent = subtract(num1, num2);
      break;

    case "*":
      numberDisplay.textContent = multiply(num1, num2);
      break;

    case "/":
      numberDisplay.textContent = divide(num1, num2);
      break;

    case "%":
      numberDisplay.textContent = modulus(num1, num2);
      break;
  }
}

function display() {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      let numberValue = number.getAttribute("value");
      if (operator === "") {
        firstNum += numberValue;
        numberDisplay.textContent = firstNum;
      } else {
        secondNum += numberValue;
        numberDisplay.textContent += secondNum;
      }
    });
  });

  operators.forEach((op) => {
    op.addEventListener("click", () => {
      let operatorValue = op.getAttribute("value");
      if (operatorValue !== "=") {
        if(operator !== ""){
            operate(firstNum, operator, secondNum);
            firstNum = numberDisplay.textContent;
            secondNum = "";
            operator = operatorValue;
            numberDisplay.textContent += operator;
        }else{
            operator = operatorValue;
            numberDisplay.textContent += operator;
        }
     }else {
        operate(firstNum, operator, secondNum);
        if(!operator){
          firstNum = 0
        }else{
        firstNum = numberDisplay.textContent;
            secondNum = "";
        }
      }
    });
  });
}

display();
