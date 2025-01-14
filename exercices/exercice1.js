/**
 * Vous devez constuire un tableau contenant le carré de chaque entier présent dans le tableau 'numbers'
 */

let numbers = [1, 2, 3, 4, 5];

let squaredNumbers = [];

//solution 1
for (let i = 0; i < numbers.length; i++) {
  squaredNumbers.push(numbers[i] * numbers[i]);
}
//solution 2
for (let number of numbers) {
  squaredNumbers.push(number * number);
}

//solution 3
numbers.forEach((number) => {
  squaredNumbers.push(number * number);
});

// Solution utilisant le paradigme fonctionnel

// A VOUS DE COMPLETER ICI

console.log(squaredNumbers); // [1, 4, 9, 16, 25]
