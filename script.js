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

/*
// Basic Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        operation.clear();
        return "ERROR";
    }
    return a / b;
};

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
        if (this.firstOperand === "ERROR") return;
        this.result = calculate(this.operator, Number(this.firstOperand), Number(this.secondOperand));
        this.firstOperand = String(this.result);
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
container.addEventListener('click', function (event) {
    // Select target clicked
    target = event.target;
    // Guard clause (to not fire any event if it's not a button)
    if (!target.closest('.btn')) return;

    if (target.closest('.digits')) {
        if (operation.operator) {
            operation.secondOperand += target.textContent;
            operation.updateDisplay();
        } else {
            if (operation.isEqualClicked || operation.firstOperand === "ERROR") {
                // operation.clear(); "Hard Reset"
                operation.firstOperand = ""; // "Soft Reset"
                operation.isEqualClicked = false;
            }
            operation.firstOperand += target.textContent;
            operation.updateDisplay();
        }
    }

    if (target.closest('.clear')) {
        operation.clear();
        operation.updateDisplay();
    }

    if (target.closest('.operations')) {
        if (!operation.firstOperand) return;

        // Chain operations
        if (operation.secondOperand) {
            operation.operate();
        }

        // Don't get operator nor update display if ERROR is thrown
        // if (operation.firstOperand === "ERROR") {
        //     operation.updateDisplay();
        //     return;
        // }
        operation.operator = target.textContent;
        operation.updateDisplay();
    }

    if (target.closest('.equal')) {

        // If no first operand, exit early
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
*/
