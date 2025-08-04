const numberDisplay = document.querySelector("#number-display");
// const totalDisplay = document.querySelector("#total");
const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");
const decimal = document.querySelector("#decimal");
const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");

function add(a, b) {
  let total = Number(a) + Number(b);
  return parseFloat(total.toFixed(7));
}

function subtract(a, b) {
  let total = Number(a) - Number(b);
  return parseFloat(total.toFixed(7));
}

function divide(a, b) {
  let total = Number(a) / Number(b);
  return parseFloat(total.toFixed(7));
}

function multiply(a, b) {
  let total = Number(a) * Number(b);
  return parseFloat(total.toFixed(7));
}

function modulus(a, b) {
  let total = Number(a) % Number(b);
  return parseFloat(total.toFixed(7));
}

let firstNum = "";
let secondNum = "";
let operator = "";
let decimalIsAllowed = true;

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
      if (operator === "=") {
        firstNum = "";
        operator = "";
        numberDisplay.textContent = "";
        firstNum += numberValue;
        numberDisplay.textContent = firstNum;
      }else if (operator === "") {
        firstNum += numberValue;
        numberDisplay.textContent = firstNum;
      } else {
        secondNum += numberValue;
        numberDisplay.textContent = `${firstNum}${operator}${secondNum}`;
      }
    });
  });

  decimal.addEventListener("click", () => {
    let decimalValue = decimal.getAttribute("value");
    if (decimalIsAllowed) {
      if (operator === "") {
        firstNum += decimalValue;
        numberDisplay.textContent = firstNum;
      } else if (operator === "=") {
        firstNum = 0;
        operator = "";
        numberDisplay.textContent = "";
        firstNum += decimalValue;
        numberDisplay.textContent = firstNum;
      } else {
        secondNum += decimalValue;
        numberDisplay.textContent = `${firstNum}${operator}${secondNum}`;
      }

      decimalIsAllowed = false;
      return;
    }
  });

  operators.forEach((op) => {
    op.addEventListener("click", () => {
      decimalIsAllowed = true;
      let operatorValue = op.getAttribute("value");
      if (operatorValue !== "=") {
        if (operatorValue !== "") {
         
          if (firstNum !== "" && secondNum === "") {
            operator = operatorValue;
            numberDisplay.textContent = `${firstNum}${operator}`;
          } else if (firstNum !== "" && secondNum !== ""){
            operate(firstNum, operator, secondNum);
            firstNum = numberDisplay.textContent;
            secondNum = "";
            operator = operatorValue;
            numberDisplay.textContent += operator;
          }
            
            
          if (operatorValue === "-" && firstNum === "") {
              firstNum = operatorValue;
              numberDisplay.textContent = firstNum;
            } else if (operatorValue !== "-" && firstNum === "") {
              return;
            } 
          secondNum = "";
          console.log(`first num = ${firstNum}`);
          console.log(operator);
          console.log(`second num = ${secondNum}`);
        }
      }else {
        if(secondNum === ""){
          return
        }else{
              operate(firstNum, operator, secondNum);
              operator = operatorValue;
              firstNum = numberDisplay.textContent;
              // operator = "";
        }
            }
    });
  });

  clear.addEventListener("click", () => {
    if (numberDisplay.textContent !== "") {
      firstNum = "";
      secondNum = "";
      operator = "";
      numberDisplay.textContent = "";
      decimalIsAllowed = true;
    } else {
      return;
    }
  });

  del.addEventListener("click", () => {
    let str = numberDisplay.textContent;
    if (str !== "" && str.length > 0) {
      if (secondNum !== "") {
        secondNum = secondNum.slice(0, -1);
        console.log(`del 2nd num : ${secondNum}`);
      } else if (operator !== "") {
        operator = operator.slice(0, -1);
        console.log(`del operator : ${operator}`);
      } else if (secondNum === "" && operator === "") {
        firstNum = firstNum.slice(0, -1);
        console.log(`del first num : ${firstNum}`);
      }
      numberDisplay.textContent = str.slice(0, -1);
    }
  });
}

display();
