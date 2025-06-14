window.onload = function() {
  // Переменные для хранения состояния калькулятора
  let firstOperand = '';
  let secondOperand = '';
  let currentOperation = null;
  let shouldResetScreen = false;
  let accumulatedValue = 0;
  let darkMode = true;
  let expression = ''; // Строка для хранения текущего выражения
  let lastInputType = null; // 'number', 'operator', или null

  // Получаем элементы интерфейса
  const outputElement = document.getElementById("result");
  const calculatorElement = document.querySelector(".calculator");
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
  const operationButtons = document.querySelectorAll('[id^="btn_op_"]:not([id="btn_op_equal"]):not([id="btn_op_clear"]):not([id="btn_op_sign"]):not([id="btn_op_percent"]):not([id="btn_op_backspace"]):not([id="btn_op_sqrt"]):not([id="btn_op_square"]):not([id="btn_op_factorial"]):not([id="btn_op_triplezero"]):not([id="btn_op_theme"]):not([id="btn_op_cube"]):not([id="btn_op_bgcolor"]):not([id="btn_op_resultcolor"])');
  
  // Кнопки
  const clearButton = document.getElementById("btn_op_clear");
  const equalsButton = document.getElementById("btn_op_equal");
  const signButton = document.getElementById("btn_op_sign");
  const percentButton = document.getElementById("btn_op_percent");
  const backspaceButton = document.getElementById("btn_op_backspace");
  const sqrtButton = document.getElementById("btn_op_sqrt");
  const squareButton = document.getElementById("btn_op_square");
  const factorialButton = document.getElementById("btn_op_factorial");
  const tripleZeroButton = document.getElementById("btn_op_triplezero");
  const bgColorButton = document.getElementById("btn_op_bgcolor");
  const resultColorButton = document.getElementById("btn_op_resultcolor");
  const themeButton = document.getElementById("btn_op_theme");
  const historyElement = document.getElementById("history");

  // Цветовые палитры
  const bgColors = ['#1e1e2f', '#2d1e2f', '#1e2f2d', '#2f2d1e', '#3e1e1e'];
  const resultColors = ['#00e0ff', '#ff00e0', '#e0ff00', '#00ff00', '#ff8000', '#ff0080'];
  let currentBgColorIndex = 0;
  let currentResultColorIndex = 0;

  // Функция для обновления дисплея
  function updateDisplay(value) {
    outputElement.textContent = value;
  }

  // Функция для обновления истории
  function updateHistory() {
    historyElement.textContent = expression;
  }

  // Добавляем цифру или точку
  function appendDigit(digit) {
    if (shouldResetScreen) {
      resetScreen();
    }
    
    if (digit === '.' && outputElement.textContent.includes('.')) return;

    // Если последний ввод был оператор, добавляем пробел перед числом
    if (lastInputType === 'operator') {
      expression += ' ';
    }

    if (outputElement.textContent === '0' && digit !== '.') {
      outputElement.textContent = digit;
      if (expression === '') {
        expression = digit;
      } else {
        expression += digit;
      }
    } else {
      outputElement.textContent += digit;
      expression += digit;
    }

    lastInputType = 'number';
    updateHistory();
  }

  // Сброс экрана
  function resetScreen() {
    outputElement.textContent = '';
    shouldResetScreen = false;
  }

  // Очистка всего калькулятора
  function clearAll() {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    accumulatedValue = 0;
    expression = '';
    lastInputType = null;
    updateDisplay('0');
    updateHistory();
  }

  // Обработка операций
  function handleOperation(operation) {
    const currentValue = outputElement.textContent;

    if (currentOperation !== null && lastInputType === 'number') {
      // Если уже есть операция и введено число, выполняем промежуточное вычисление
      calculate(false);
    }

    firstOperand = outputElement.textContent;
    currentOperation = operation;
    shouldResetScreen = true;

    // Добавляем пробел перед оператором, если последний ввод был число
    if (lastInputType === 'number') {
      expression += ' ';
    }
    
    expression += operation;
    lastInputType = 'operator';
    updateHistory();
  }

  // Вычисление результата
  function calculate(showEquals = true) {
    if (currentOperation === null || shouldResetScreen) return;

    if (currentOperation === '/' && outputElement.textContent === '0') {
      alert("Деление на ноль невозможно!");
      clearAll();
      return;
    }

    secondOperand = outputElement.textContent;
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);
    let result;

    switch (currentOperation) {
      case '+': result = first + second; break;
      case '-': result = first - second; break;
      case 'x': result = first * second; break;
      case '/': result = first / second; break;
      default: return;
    }

    result = Math.round(result * 1000000) / 1000000;
    updateDisplay(result);
    
    if (showEquals) {
      // Добавляем знак равенства и результат только при явном нажатии =
      expression += ' = ' + result;
      updateHistory();
      // Сбрасываем выражение для нового вычисления
      expression = '';
      lastInputType = null;
    } else {
      // При промежуточных вычислениях обновляем firstOperand
      firstOperand = result.toString();
    }
    
    currentOperation = null;
    shouldResetScreen = true;
  }

  // 1. Операция смены знака +/-
  function changeSign() {
    const currentValue = outputElement.textContent;
    if (currentValue === '0') return;
    
    if (currentValue.startsWith('-')) {
      updateDisplay(currentValue.substring(1));
      // Обновляем последнее число в выражении
      expression = expression.replace(/-?\d+(\.\d+)?$/, currentValue.substring(1));
    } else {
      updateDisplay('-' + currentValue);
      // Обновляем последнее число в выражении
      expression = expression.replace(/\d+(\.\d+)?$/, '-' + currentValue);
    }
    updateHistory();
  }

  // 2. Операция вычисления процента %
  function calculatePercent() {
    const currentValue = parseFloat(outputElement.textContent);
    const result = currentValue / 100;
    updateDisplay(result.toString());
    // Обновляем последнее число в выражении
    expression = expression.replace(/\d+(\.\d+)?$/, result);
    updateHistory();
  }

  // 3. Стирание последней цифры (backspace)
  function backspace() {
    if (outputElement.textContent.length === 1 || 
        (outputElement.textContent.length === 2 && outputElement.textContent.startsWith('-'))) {
      updateDisplay('0');
      if (expression.length > 0) {
        expression = expression.slice(0, -1);
      }
    } else {
      updateDisplay(outputElement.textContent.slice(0, -1));
      if (expression.length > 0) {
        expression = expression.slice(0, -1);
      }
    }
    updateHistory();
  }

  // 5. Операция вычисления квадратного корня √
  function squareRoot() {
    const currentValue = parseFloat(outputElement.textContent);
    if (currentValue < 0) {
      alert("Ошибка: нельзя извлечь корень из отрицательного числа!");
      return;
    }
    const result = Math.sqrt(currentValue);
    updateDisplay(result.toString());
    shouldResetScreen = true;
    
    // Очищаем историю и добавляем запись вида sqrt(число)=результат
    expression = `sqrt(${currentValue})=${result}`;
    updateHistory();
  }

  // 6. Операция возведения в квадрат x²
  function square() {
    const currentValue = parseFloat(outputElement.textContent);
    const result = currentValue * currentValue;
    updateDisplay(result.toString());
    shouldResetScreen = true;
    
    // Очищаем историю и добавляем запись вида (число)^2=результат
    expression = `(${currentValue})^2=${result}`;
    updateHistory();
  }

  // 7. Операция вычисления факториала x!
  function factorial() {
    let currentValue = parseInt(outputElement.textContent);
    if (currentValue < 0) {
      alert("Ошибка: факториал отрицательного числа не определен!");
      return;
    }
    if (currentValue > 20) {
      alert("Ошибка: число слишком большое для точного вычисления факториала!");
      return;
    }
    
    let result = 1;
    for (let i = 2; i <= currentValue; i++) {
      result *= i;
    }
    updateDisplay(result.toString());
    shouldResetScreen = true;
    
    // Очищаем историю и добавляем запись вида число!=результат
    expression = `${currentValue}!=${result}`;
    updateHistory();
  }

  // 8. Добавление трех нулей (000)
  function addTripleZero() {
    if (outputElement.textContent === '0' || shouldResetScreen) {
      resetScreen();
    }
    outputElement.textContent += '000';
    
    // Обновляем историю только если это не начало нового вычисления
    if (lastInputType !== 'operator') {
      expression += ' 000';
      updateHistory();
    }
  }

  // 9. Накапливаемое сложение
  function accumulateAddition() {
    const currentValue = parseFloat(outputElement.textContent);
    accumulatedValue += currentValue;
    updateDisplay(accumulatedValue.toString());
    shouldResetScreen = true;
    // Не обновляем историю для накапливаемых операций
    expression = accumulatedValue.toString();
    lastInputType = 'number';
  }

  // 10. Накапливаемое вычитание
  function accumulateSubtraction() {
    const currentValue = parseFloat(outputElement.textContent);
    accumulatedValue -= currentValue;
    updateDisplay(accumulatedValue.toString());
    shouldResetScreen = true;
    // Не обновляем историю для накапливаемых операций
    expression = accumulatedValue.toString();
    lastInputType = 'number';
  }

  // 12. Индивидуальная операция: x^3 (возведение в куб)
  function cube() {
    const currentValue = parseFloat(outputElement.textContent);
    const result = currentValue ** 3;
    updateDisplay(result.toString());
    shouldResetScreen = true;
    
    // Очищаем историю и добавляем запись вида (число)^3=результат
    expression = `(${currentValue})^3=${result}`;
    updateHistory();
  }

  // 4. Смена цвета фона калькулятора
  function changeBackgroundColor() {
    currentBgColorIndex = (currentBgColorIndex + 1) % bgColors.length;
    calculatorElement.style.backgroundColor = bgColors[currentBgColorIndex];
    // Не обновляем историю для смены цвета фона
  }

  // 11. Смена цвета текста результата
  function changeResultColor() {
    currentResultColorIndex = (currentResultColorIndex + 1) % resultColors.length;
    outputElement.style.color = resultColors[currentResultColorIndex];
    // Не обновляем историю для смены цвета текста
  }

  // Смена темы (светлая/тёмная)
  function toggleTheme() {
    if (darkMode) {
      // Светлая тема
      document.documentElement.style.setProperty('--primary-bg', '#f0f0f0');
      document.documentElement.style.setProperty('--secondary-bg', '#ffffff');
      document.documentElement.style.setProperty('--button-color', '#6a0dad');
      document.documentElement.style.setProperty('--button-hover', '#ff69b4');
      document.documentElement.style.setProperty('--font-color', '#111');
      document.documentElement.style.setProperty('--result-color', '#0033cc');
    } else {
      // Тёмная тема
      document.documentElement.style.setProperty('--primary-bg', '#1e1e2f');
      document.documentElement.style.setProperty('--secondary-bg', '#2e2e3f');
      document.documentElement.style.setProperty('--button-color', '#4f8a8b');
      document.documentElement.style.setProperty('--button-hover', '#f45b69');
      document.documentElement.style.setProperty('--font-color', '#e0e0e0');
      document.documentElement.style.setProperty('--result-color', '#00e0ff');
    }
    darkMode = !darkMode;
    // Не обновляем историю для смены темы
  }

  // Обработчики событий
  digitButtons.forEach(button => {
    button.addEventListener('click', () => appendDigit(button.textContent));
  });

  operationButtons.forEach(button => {
    button.addEventListener('click', () => handleOperation(button.textContent));
  });

  equalsButton.addEventListener('click', () => calculate(true));
  clearButton.addEventListener('click', clearAll);
  signButton.addEventListener('click', changeSign);
  percentButton.addEventListener('click', calculatePercent);
  backspaceButton.addEventListener('click', backspace);
  sqrtButton.addEventListener('click', squareRoot);
  squareButton.addEventListener('click', square);
  factorialButton.addEventListener('click', factorial);
  tripleZeroButton.addEventListener('click', addTripleZero);
  bgColorButton.addEventListener('click', changeBackgroundColor);
  resultColorButton.addEventListener('click', changeResultColor);
  themeButton.addEventListener('click', toggleTheme);

  // Кнопки для накапливаемых операций
  document.getElementById("btn_op_accum_add").addEventListener('click', accumulateAddition);
  document.getElementById("btn_op_accum_sub").addEventListener('click', accumulateSubtraction);
  
  // Индивидуальная операция (возведение в куб)
  document.getElementById("btn_op_cube").addEventListener('click', cube);

  // Инициализация калькулятора
  clearAll();
};