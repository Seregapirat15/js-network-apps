/**
 * Задание 1.3 (1 уровень)
 * Функция, которая возвращает сумму квадратов значений массива.
 */
function sumOfSquares(arr) {
    return arr.reduce((sum, current) => sum + current * current, 0);
}

// Примеры использования
console.log(sumOfSquares([1, 2, 3])); // 14 (1² + 2² + 3² = 1 + 4 + 9 = 14)
console.log(sumOfSquares([5, 10, 15])); // 350 (5² + 10² + 15² = 25 + 100 + 225 = 350) 