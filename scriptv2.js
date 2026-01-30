// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Get values for operation through user before getting button events
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

// Object to store entire operation
const operation = {
    firstOperand: "",
    secondOperand: "",
    prevSecondOperand: "",
    operator: "",
    prevOperator: "",
    result: null,
    isEqualClicked: false,

    // Manage states after operation
    operate() {
        this.result = calculate(this.operator, Number(this.firstOperand), Number(this.secondOperand));

        // Do not try to round it up when result throws ERROR
        if (this.result === "ERROR") {
            this.firstOperand = "ERROR";
        } else {
            this.firstOperand = String(Number(this.result.toFixed(10)));
        }
        // Set values to previous operation and prepare current values for next operation
        this.result = null;
        this.prevSecondOperand = this.secondOperand;
        this.secondOperand = "";
        this.prevOperator = this.operator;
        this.operator = "";
    },

    // Display change on DOM
    updateDisplay() {
        let left = this.firstOperand ? this.firstOperand : "0";
        let middle = this.operator ? this.operator : "";
        let right = this.secondOperand ? this.secondOperand : "";
        displayText.textContent = `${left} ${middle} ${right}`;
    },

    // Reset everything
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
const displayText = container.querySelector('.display-text');

container.addEventListener('click', function (event) {
    // Select target clicked
    target = event.target;
    // Guard clause (to not fire any event if it's not a button)
    if (!target.closest('.btn')) return;

    if (target.closest('.digit')) {
        // Prevent leading decimal by adding a zero
        if (!operation.firstOperand && (target === decimal)) operation.firstOperand = '0';

        // Decide first operand or second operand by checking if there is operator
        if (operation.operator) {
            // Get second operand
            if (!operation.secondOperand && (target === decimal)) operation.secondOperand = '0';
            // If it contains one decimal already and decimal is clicked again, don't do concatenation
            if (!(operation.secondOperand.includes('.') && target === decimal)) {
                operation.secondOperand += target.textContent;
            }
        } else {
            // Get first operand
            // First clear everything if previous operation (first operand) results in ERROR
            if (operation.firstOperand === "ERROR") {
                operation.clear(); // Hard Reset
            }

            // Clear only the first operand if equal was clicked and want to start a new operation
            if (operation.isEqualClicked) {
                // Reset first operand if target is anything other than decimal point
                // Otherwise, keep first operand to append after decimal point
                if (target !== decimal) {
                    operation.firstOperand = "";
                }
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

    if (target.closest('.operation')) {
        // Exit if previous operation results in ERROR
        if (operation.firstOperand === "ERROR") return;

        // Determine first operand if any operator is clicked when there is no first operand
        if (!operation.firstOperand) operation.firstOperand = "0";

        // Chain operations if there is second operand AND any operator is clicked
        if (operation.secondOperand) {
            operation.operate();
        }

        // Get an operator only if first operand is not ERROR
        // This first operand being "ERROR" is not caught at the beginning until next operation since it is after calling operate()
        if (operation.firstOperand !== "ERROR") {
            operation.operator = target.textContent;
        }

        operation.updateDisplay();
    }

    if (target.closest('.equal')) {
        // Exit if no first operand or previous operation results in ERROR
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

        // Operate only if there is operator (with or without second operand) OR previous operation
        if (operation.operator || operation.prevOperator) {
            operation.operate();
            operation.updateDisplay();
            operation.isEqualClicked = true;
        }
    }

    if (target.closest('.back')) {
        operation.isEqualClicked = false;
        if (operation.secondOperand) {
            operation.secondOperand = operation.secondOperand.slice(0, -1);
        } else if (operation.operator) {
            operation.operator = "";
        } else if (operation.firstOperand === "ERROR") {
            operation.clear();
        } else {
            operation.firstOperand = operation.firstOperand.slice(0, -1);
        }
        operation.updateDisplay();
    }
});

operation.updateDisplay();
