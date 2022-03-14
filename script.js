class Calculator {
	constructor(previousOpText, currentOpText) {
		this.previousOpText = previousOpText;
		this.currentOpText = currentOpText;
		this.clear();
	}

	clear() {
		this.currentOp = '';
		this.previousOp = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOp = this.currentOp.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOp.includes('.')) return;
		this.currentOp = number = this.currentOp.toString() + number.toString();
	}

	chooseOp(operation) {
		if (this.currentOp === '') return;
		if (this.previousOp !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOp = this.currentOp;
		this.currentOp = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOp);
		const current = parseFloat(this.currentOp);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case 'x':
				computation = prev * current;
				break;
			case '/':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOp = computation;
		this.operation = undefined;
		this.previousOp = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerNumbers = parseFloat(stringNumber.split('.')[0]);
		const decimalNumbers = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerNumbers)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerNumbers.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalNumbers != null) {
			return `${integerDisplay}.${decimalNumbers}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOpText.innerText = this.getDisplayNumber(this.currentOp);
		if (this.operation != null) {
			this.previousOpText.innerText = `${this.getDisplayNumber(
				this.previousOp
			)} ${this.operation}`;
		} else {
			this.previousOpText.innerText = '';
		}
	}
}

const numberBtns = document.querySelectorAll('.numberbtn');
const functionBtns = document.querySelectorAll('.operatorbtn');
const equalsBtn = document.querySelector('#equals');
const deleteBtn = document.querySelector('#backspace');
const clearBtn = document.querySelector('#clear');
const previousOpText = document.querySelector('.previous-op');
const currentOpText = document.querySelector('.current-op');

const calculator = new Calculator(previousOpText, currentOpText);

clearBtn.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

numberBtns.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

functionBtns.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOp(button.innerText);
		calculator.updateDisplay();
	});
});

equalsBtn.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});
