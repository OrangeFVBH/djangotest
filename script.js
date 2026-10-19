const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculateBtn');
const resultBox = document.getElementById('result');

const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) {
            throw new Error('Деление на ноль невозможно');
        }
        return a / b;
    },
    power: (a, b) => Math.pow(a, b)
};

calculateBtn.addEventListener('click', () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    if (isNaN(num1) || isNaN(num2)) {
        resultBox.className = 'mt-4 alert alert-danger';
        resultBox.textContent = 'Пожалуйста, введите оба числа';
        return;
    }

    try {
        const result = operations[operation](num1, num2);
        resultBox.className = 'mt-4 alert alert-info';
        resultBox.textContent = `Результат: ${result}`;
    } catch (error) {
        resultBox.className = 'mt-4 alert alert-danger';
        resultBox.textContent = error.message;
    }
});