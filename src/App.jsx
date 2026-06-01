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
		result: null,
		isEqualClicked: false,
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
}
