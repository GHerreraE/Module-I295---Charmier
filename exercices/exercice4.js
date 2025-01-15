/**
 * Vous devez coder une fonction fléchée qui retourne l'animal (donc l'objet js)
 * qui a une menace (threat) de 5 unités.
 */

const animals = [
  { name: "frog", threat: 0 },
  { name: "monkey", threat: 5 },
  { name: "gorilla", threat: 8 },
  { name: "lion", threat: 10 },
];
/*
// Solution utilisant le paradigme procédurale
function searchAnimal(animal) {
  return animal.threat == 5;
}
console.log(animals.find(searchAnimal));*/
// Solution utilisant le paradigme fonctionnel
const resultatFinal = animals.find((animal) => animal.threat === 5);

console.log(resultatFinal);

// returns object - {name: "monkey", threat: 5}

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
