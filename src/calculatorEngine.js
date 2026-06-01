// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Handle calculation
export const calculate = (operator, firstOperand, secondOperand) => {
    switch (operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            if (secondOperand === 0) return "ERROR";
            return divide(firstOperand, secondOperand);
    }
    return firstOperand;
}
