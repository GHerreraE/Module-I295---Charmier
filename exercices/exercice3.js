/**
 * Vous devez faire la somme des entiers présent dans le tableau numbers
 */

let numbers = [1, 2, 3, 4, 5]; // tableau avec les chiffres

// Solution utilisant le paradigme procédurale

// condition => si i est plus petit que la longueur de numbers
// let sum = 0; // variable pour stocker la somme de toutes les chiffres
/*for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i]; // on ajoute la valeur de numbers[i] à la variable sum
}
*/

// Solution utilisant le paradigme fonctionnel
// constant pour stocker la somme des valeurs
// reduce fait la somme des nombres du tableau avec la methode reducer
// on met sum pour accumuler tout dedans
// on met number est la valeur de l'element du tableau
// on met 0 pour initialiser le tableau (pas besoin de le mettre)
let sum = numbers.reduce((sum, number) => sum + number, 0);

console.log(sum); // 15

// https://sentry.io/answers/how-to-find-the-sum-of-an-array-of-numbers/
