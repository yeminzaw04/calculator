// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Get values for an operation
// let firstOperand = Number(prompt("Enter a number:"));
// let secondOperand = Number(prompt("Enter another number:"));
// let operator = prompt("What would you like to do: add, subract, multiply, or divide?");

// Handle calculation
const operate = (operator, firstOperand, secondOperand) => {
    switch (operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
    }
}


let firstOperand = "";
let secondOperand = "";
let operator;
let prevSecondOperand;
let result;
let isEqualClicked = false;
let isOperatorClicked = false;

const container = document.querySelector(".container");
container.addEventListener('click', event => {
    let target = event.target;

    // Guard clause
    if (!target.classList.contains('btn')) return;

    // If a digit is clicked, set first operand and second operand
    if (target.closest('.digits')) {
        if (isEqualClicked) clear();
        // If there is no operator yet, get first operand
        if (!operator) {
            // Concatenation is used to join numbers as string before doing number operations
            // If there is a result from previous operation, first operand is set to result, no need of concatenation
            if (!result) {
                firstOperand = String(firstOperand) + target.textContent;
            } else {
                firstOperand = target.textContent;
                result = null;
            }
            // Get second operand after we get operator
        } else {
            if (!result) {
                secondOperand = String(secondOperand) + target.textContent;
            } else {
                secondOperand = target.textContent;
                result = null;
            }
        }
    }

    if (target.closest('.equal')) {
        if (isOperatorClicked) {
            isOperatorClicked = false;
            secondOperand = prevSecondOperand;
            console.log(secondOperand, "Testing")
        }

        if (operator && firstOperand && secondOperand) {
            result = operate(operator, Number(firstOperand), Number(secondOperand));
            firstOperand = result;
            isEqualClicked = true;
            console.log(result);
        }
    }

    if (target.closest('.operations')) {
        if (isEqualClicked) {
            secondOperand = 0;
            isEqualClicked = false;
        }

        // if (firstOperand && !secondOperand) {
        //     secondOperand = firstOperand;
        // }

        if (operator && firstOperand && secondOperand) {
            result = operate(operator, Number(firstOperand), Number(secondOperand));
            console.log(result);
            firstOperand = result;
            prevSecondOperand = secondOperand;
            secondOperand = 0; // START FROM HERE
            operator = null;
            isOperatorClicked = true;
        }
    }

      // Get an operator if there is already a first operand
    if (target.closest('.operations')) {
        if (firstOperand) {
            operator = target.textContent;
        }
    }
});

const clear = () => {
    operator = null;
    firstOperand = "";
    secondOperand = "";
    result = null;
    isEqualClicked = false;
    isOperatorClicked = false;
}
