/**
 * Задание 1.6 (1 уровень)
 * Функция, которая сравнивает два массива и возвращает true, если они идентичны.
 */
function isEqualArrays(arr1, arr2) {
    // Проверяем равенство длин массивов
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // Сравниваем каждый элемент
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
}

// Примеры использования
console.log(isEqualArrays([1, 2, 3], [1, 2, 3])); // true
console.log(isEqualArrays([1, 2, 3], [1, 2, 4])); // false
console.log(isEqualArrays([1, 2, 3], [1, 2])); // false 