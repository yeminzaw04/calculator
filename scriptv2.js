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
const calculate = (operator, firstOperand, secondOperand) => {
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
    return firstOperand;
}

const operation = {
    firstOperand: "",
    secondOperand: "",
    prevSecondOperand: "",
    operator: "",
    prevOperator: "",
    result: null,
    isEqualClicked: false,
    isOperatorClicked: false,
    operate() {
        this.result = calculate(this.operator, Number(this.firstOperand), Number(this.secondOperand));
        this.firstOperand = String(this.result);
        this.result = null;
        this.prevSecondOperand = this.secondOperand;
        this.secondOperand = "";
        this.prevOperator = this.operator;
        this.operator = "";
    },
    displayResult() {
        console.log(this.firstOperand);
    },
    clear() {
        this.firstOperand = "";
        this.secondOperand = "";
        this.prevSecondOperand = "";
        this.operator = "";
        this.prevOperator = "";
        this.result = null;
        this.isEqualClicked = false;
        this.isOperatorClicked = false;
    },
};

const container = document.querySelector('.container');
container.addEventListener('click', function (event) {
    // Select target clicked
    target = event.target;
    // Guard clause (to not fire any event if it's not a button)
    if (!target.closest('.btn')) return;

    if (target.closest('.digits')) {
        if (operation.operator) {
            operation.secondOperand += target.textContent;
        } else {
            if (operation.isEqualClicked) {
                operation.clear();
                // operation.firstOperand = "";
                operation.isEqualClicked = false;
            }
            operation.firstOperand += target.textContent;
        }
    }

    if (target.closest('.operations')) {
        if (!operation.firstOperand) return;
        operation.operator = target.textContent;
    }

    if (target.closest('.equal')) {

        // If no first operand, exit early
        if (!operation.firstOperand) return;

        // If no second operand, copy from first operand
        if (operation.operator && !operation.secondOperand) {
            operation.secondOperand = operation.firstOperand;
        }

        // If no operator but have previous operation
        if (!operation.operator && operation.prevOperator) {
            operation.operator = operation.prevOperator;
            operation.secondOperand = operation.prevSecondOperand;
        }

        operation.operate();
        operation.displayResult();
        operation.isEqualClicked = true;
    }
});
