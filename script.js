const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
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

function showResult(message, type = 'info') {
    const classes = {
        info: 'mt-4 alert alert-info',
        error: 'mt-4 alert alert-danger',
        empty: 'mt-4 alert alert-secondary'
    };
    resultBox.className = classes[type] || classes.info;
    resultBox.textContent = message;
}

function setFieldError(input, hasError) {
    input.classList.toggle('is-invalid', hasError);
}

function readNumber(input) {
    const raw = input.value.trim();
    if (raw === '') {
        return { value: NaN, valid: false, empty: true };
    }
    const value = parseFloat(raw);
    return { value, valid: !isNaN(value), empty: false };
}

function calculate() {
    const n1 = readNumber(num1Input);
    const n2 = readNumber(num2Input);

    setFieldError(num1Input, !n1.valid && !n1.empty);
    setFieldError(num2Input, !n2.valid && !n2.empty);

    if (n1.empty || n2.empty) {
        showResult('Введите оба числа', 'empty');
        return;
    }

    if (!n1.valid || !n2.valid) {
        showResult('Введите корректные числа', 'error');
        return;
    }

    try {
        const operation = operationSelect.value;
        const result = operations[operation](n1.value, n2.value);
        showResult(`Результат: ${result}`, 'info');
    } catch (error) {
        showResult(error.message, 'error');
    }
}

num1Input.addEventListener('input', calculate);
num2Input.addEventListener('input', calculate);
operationSelect.addEventListener('change', calculate);