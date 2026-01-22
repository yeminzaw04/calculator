const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
let firstOperand = Number(prompt("Enter a number:"));
let secondOperand = Number(prompt("Enter another number:"));
let operator = prompt("What would you like to do: add, subract, multiply, or divide?");
const operate = (operator, firstOperand, secondOperand) => {
    switch(operator) {
        case "add":
            return add(firstOperand, secondOperand);
        case "subtract":
            return subtract(firstOperand, secondOperand);
        case "multiply":
            return multiply(firstOperand, secondOperand);
        case "divide":
            return divide(firstOperand, secondOperand);
    }
}
console.log(operate(operator, firstOperand, secondOperand));
