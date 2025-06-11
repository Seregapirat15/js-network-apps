/**
 * Задание 1.2 (1 уровень)
 * Функция, которая возвращает количество повторяющихся элементов в массиве.
 */
function countIdentic(arr) {
    const counts = {};
    let duplicatesCount = 0;
    
    // Подсчитываем количество каждого элемента
    for (const item of arr) {
        counts[item] = (counts[item] || 0) + 1;
    }
    
    // Считаем элементы, которые встречаются более одного раза
    for (const item in counts) {
        if (counts[item] > 1) {
            duplicatesCount += 1;
        }
    }
    
    return duplicatesCount;
}

// Примеры использования
console.log(countIdentic([1, 2, 3, 4])); // 0 (нет повторяющихся элементов)
console.log(countIdentic([1, 2, 2, 3, 3, 4])); // 2 (элементы 2 и 3 повторяются) 