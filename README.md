# JavaScript Calculator

A functional arithmetic calculator built to handle basic operations. This project was an exercise in managing application state and handling user input edge cases.

## Features
* Standard operations: Addition, Subtraction, Multiplication, and Division.
* Decimal point logic (preventing multiple decimals in a single operand).
* Clear and Delete functionality for correcting input.

## Logic & Edge Cases
* **Operation Chaining:** The logic allows for multiple operations to be strung together (e.g., 5 + 5 + 5) by evaluating the previous pair before moving to the next.
* **Zero Division:** Added a check to handle division by zero, preventing "Infinity" from breaking the UI layout.
* **Input Validation:** Restricted the UI from accepting multiple consecutive operators to prevent calculation errors.
