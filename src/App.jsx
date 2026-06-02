import React, { useState } from 'react';
import { calculate } from './calculatorEngine';

export default function App() {
	// Refer to v2's Object to store entire application state
	const [calcState, setCalcState] = useState({
		firstOperand: "",
		secondOperand: "",
		prevSecondOperand: "",
		operator: "",
		prevOperator: "",
		isEqualClicked: false,
		// no need to store current result
	});

	// Reset everything
	const handleClear = () => {
		setCalcState({
			firstOperand: "",
			secondOperand: "",
			prevSecondOperand: "",
			operator: "",
			prevOperator: "",
			isEqualClicked: false,
		});
	};

	const handleOperands = value => {
		// Second Operand
		if (calcState.operator) {

		} else { // First Operand
			let currentFirst = calcState.firstOperand;
			// First Operand can be "ERROR", and when it is, clear everything
			if (currentFirst === "ERROR") {
				setCalcState({
					firstOperand: value === "." ? "0." : value,
					secondOperand: "",
					prevSecondOperand: "",
					operator: "",
					prevOperator: "",
					isEqualClicked: false,
				})
				return; // Stop execution instantly for this frame!
			}

			// Clear only the first operand if equal was clicked and want to start a new operation
			if (calcState.isEqualClicked) {
				if (value !== decimal) {
					currentFirst = "";
				}
			}

			// Prevent leading decimals
			if (currentFirst === "" && value === ".") {
				currentFirst = "0";
			}

			// Prevent duplicate decimals
			if (currentFirst.includes(".") && value === ".") {
				return;
			}

			// Append and Save for Next Render
			const updatedFirst = currentFirst + value;
			setCalcState(prevState => ({
				...prevState,
				firstOperand: updatedFirst,
				isEqualClicked: false,
			}));
		}
	};
}




/* * MIND SHIFT NOTE: WHY THIS IS DIFFERENT FROM VANILLA JS
   * * 1. The 'current' Sandbox: React state is read-only. We can't change it line-by-line.
   * So we use 'currentFirst' as a temporary staging zone to safely build our strings
   * and run our checks before saving.
   * * 2. State updates are NOT instant: When we call setCalcState(), React just takes
   * a ticket to update the screen on the NEXT render frame. It doesn't change
   * anything on the very next line of code.
   * * 3. Why the 'return' guard rails matter: Because code keeps running on stale data,
   * if we don't hit 'return;' inside an error check, the function will blindly
   * bleed into the lower lines, smash our strings together, and override our
   * clean state update before React even gets a chance to redraw the screen.
*/
