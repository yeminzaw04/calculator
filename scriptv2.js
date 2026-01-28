// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Get values for an operation
// let firstOperand = Number(prompt("Enter a number:"));
// let secondOperand = Number(prompt("Enter another number:"));
// let operator = prompt("What would you like to do: add, subtract, multiply, or divide?");

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
            if (secondOperand === 0) return "ERROR";
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
    operate() {
        this.result = calculate(this.operator, Number(this.firstOperand), Number(this.secondOperand));
        if (this.result === "ERROR") {
            this.firstOperand = "ERROR";
        } else {
            this.firstOperand = String(Number(this.result.toFixed(2)));
        }
        this.result = null;
        this.prevSecondOperand = this.secondOperand;
        this.secondOperand = "";
        this.prevOperator = this.operator;
        this.operator = "";
    },
    updateDisplay() {
        let left = this.firstOperand ? this.firstOperand : "0";
        let middle = this.operator ? this.operator : "";
        let right = this.secondOperand ? this.secondOperand : "";
        console.log(`${left} ${middle} ${right}`);
    },
    clear() {
        this.firstOperand = "";
        this.secondOperand = "";
        this.prevSecondOperand = "";
        this.operator = "";
        this.prevOperator = "";
        this.result = null;
        this.isEqualClicked = false;
    },
};

const container = document.querySelector('.container');
const decimal = container.querySelector('.decimal');

container.addEventListener('click', function (event) {
    // Select target clicked
    target = event.target;
    // Guard clause (to not fire any event if it's not a button)
    if (!target.closest('.btn')) return;

    if (target.closest('.digits')) {
        // Prevent leading decimal by adding a zero
        if (!operation.firstOperand && (target === decimal)) operation.firstOperand = '0';

        // Decide first operand or second operand by checking if there is operator
        if (operation.operator) {
            if (!operation.secondOperand && (target === decimal)) operation.secondOperand = '0';
            // If it contains one decimal already and decimal is clicked again, don't do concatenation
            if (!(operation.secondOperand.includes('.') && target === decimal)) {
                operation.secondOperand += target.textContent;
            }
        } else {
            // Clear everything first, then change from ERROR to whatever digit we want
            if (operation.firstOperand === "ERROR") {
                operation.clear(); // Hard Reset
            }
            // Clear only the first operand if equal was clicked and want to start a new operation
            if (operation.isEqualClicked) {
                operation.firstOperand = ""; // Soft Reset
                operation.isEqualClicked = false;
            }
            // If it contains one decimal already and decimal is clicked again, don't do concatenation
            if (!(operation.firstOperand.includes('.') && target === decimal)) {
                operation.firstOperand += target.textContent;
            }
        }
        operation.updateDisplay();
    }

    if (target.closest('.clear')) {
        operation.clear();
        operation.updateDisplay();
    }

    if (target.closest('.operations')) {
        // Exit if there is no first operand
        // if (!operation.firstOperand || operation.firstOperand === "ERROR") return;
        if (operation.firstOperand === "ERROR") return;
        if (!operation.firstOperand) operation.firstOperand = "0";

        // Chain operations
        if (operation.secondOperand) {
            operation.operate();
        }

        // Get an operator only if first operand is not ERROR
        if (operation.firstOperand !== "ERROR") {
            operation.operator = target.textContent;
        }

        operation.updateDisplay();
    }

    if (target.closest('.equal')) {
        // Exit early if no first operand or first operand is ERROR
        if (!operation.firstOperand || operation.firstOperand === "ERROR") return;

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
        operation.updateDisplay();
        operation.isEqualClicked = true;
    }
});

operation.updateDisplay();
