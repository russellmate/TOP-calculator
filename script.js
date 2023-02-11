const previousOp = document.querySelector('.previous-op');
const currentOp = document.querySelector('.current-op');
const numberBtns = document.querySelectorAll('.numberbtn');
const operatorBtns = document.querySelectorAll('.operatorbtn');

let operatorClicked = false;

numberBtns.forEach(item => {
	item.addEventListener('click', () => {
		const text = document.createTextNode(item.textContent);
		if (operatorClicked === false) {
			previousOp.appendChild(text);
		} else {
			currentOp.appendChild(text);
		}
	});
});

const point = document.getElementById('dot').addEventListener('click', () => {
	if (operatorClicked === false) {
		if (previousOp.textContent.includes('.')) return;
		else {
			previousOp.textContent += '.';
		}
	} else {
		if (currentOp.textContent.includes('.')) return;
		else {
			currentOp.textContent += '.';
		}
	}
});

operatorBtns.forEach(item => {
	item.addEventListener('click', () => {
		if (operatorClicked) {
			return;
		}
		const text = document.createTextNode(item.textContent);
		previousOp.appendChild(text);
		operatorClicked = true;
	});
});

function add(n1, n2) {
	return n1 + n2;
}

function subtract(n1, n2) {
	return n1 - n2;
}

function multiply(n1, n2) {
	return n1 * n2;
}

function divide(n1, n2) {
	return n1 / n2;
}

let equalsClicked = false;
const equals = document
	.getElementById('equals')
	.addEventListener('click', () => {
		const prevOpStr = previousOp.textContent;
		const currOpStr = currentOp.textContent;

		if (currOpStr === '') {
			return;
		}

		if (prevOpStr.includes('+')) {
			let sum = document.createTextNode(
				add(parseFloat(prevOpStr), parseFloat(currOpStr))
			);
			previousOp.textContent = '';
			currentOp.textContent = '';
			previousOp.appendChild(sum);
		} else if (prevOpStr.includes('-')) {
			let sum = document.createTextNode(
				subtract(parseFloat(prevOpStr), parseFloat(currOpStr))
			);
			previousOp.textContent = '';
			currentOp.textContent = '';
			previousOp.appendChild(sum);
		} else if (prevOpStr.includes('x')) {
			let sum = document.createTextNode(
				multiply(parseFloat(prevOpStr), parseFloat(currOpStr))
			);
			previousOp.textContent = '';
			currentOp.textContent = '';
			previousOp.appendChild(sum);
		} else if (prevOpStr.includes('/')) {
			let sum = document.createTextNode(
				divide(parseFloat(prevOpStr), parseFloat(currOpStr))
			);
			previousOp.textContent = '';
			currentOp.textContent = '';
			previousOp.appendChild(sum);
		}

		equalsClicked = true;
		operatorClicked = false;
	});

const clear = document.getElementById('clear').addEventListener('click', () => {
	previousOp.textContent = '';
	currentOp.textContent = '';
	operatorClicked = false;
	equalsClicked = false;
});

const backspace = document
	.querySelector('#backspace')
	.addEventListener('click', () => {
		let prevOpStr = previousOp.textContent;
		let currOpStr = currentOp.textContent;

		if (
			prevOpStr.includes('+') ||
			prevOpStr.includes('-') ||
			prevOpStr.includes('*') ||
			prevOpStr.includes('/')
		) {
			currOpStr = currOpStr.slice(0, -1);
			currOpStr = document.createTextNode(currOpStr);
			currentOp.textContent = '';
			currentOp.appendChild(currOpStr);
		} else {
			prevOpStr = prevOpStr.slice(0, -1);
			prevOpStr = document.createTextNode(prevOpStr);
			previousOp.textContent = '';
			previousOp.appendChild(prevOpStr);
		}
	});
