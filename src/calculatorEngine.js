// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Handle calculation
export const calculate = (operator, firstOperand, secondOperand) => {
    const num1 = Number(firstOperand);
    const num2 = Number(secondOperand);

    if (isNaN(num1) || isNaN(num2)) return "ERROR";

    let result;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            if (num2 === 0) return "ERROR";
            result = divide(num1, num2);
            break;
        default:
            return String(num1);
    }
    return String(Number(result.toFixed(10)));
}
