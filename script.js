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
let result;

const container = document.querySelector(".container");
container.addEventListener('click', event => {
    let target = event.target;

    // Guard clause
    if (!target.classList.contains('btn')) return;

    // If a digit is clicked, set first operand and second operand
    if (target.closest('.digits')) {
        // If there is no operator yet, get first operand
        if (!operator) {
            // Concatenation is used to join numbers as string before doing number operations
            // If there is a result from previous operation, first operand is set to result, no need of concatenation
            if (!result) {
                firstOperand = String(firstOperand) + target.textContent;
            } else {
                firstOperand = "";
                firstOperand = String(firstOperand) + target.textContent;
            }
        // Get second operand after we get operator
        } else {
            secondOperand = String(secondOperand) + target.textContent;
        }
    }

    // Get an operator if there is already a first operand
    if (target.closest('.operations')) {
        if (firstOperand) {
            operator = target.textContent;
        }

    }

    // Do operation and display result
    // First check - if equal or any operation is clicked
    if (target.closest('.equal') || target.closest('.operations')) {
        // Second check - if there is all 3 parts of an operation
        if (operator && firstOperand && secondOperand) {
            result = operate(operator, Number(firstOperand), Number(secondOperand));
            // Dummy display
            alert (result);
            // Prepare for next operation
            firstOperand = result;
            secondOperand = 0; // Second operand is falsy placeholder ready to receive the value for next operation
            // If any operator is clicked second time, keep it for next operation, otherwise it is null
            operator = target.closest(".operations") ? target.textContent : null;
        }
    }
});
