// Tableau des produits de base
// Ces produits ne seront pas effacés au moment de redémarrage nodemon
let products = [
  {
    id: 1,
    name: "Big Mac",
    price: 5.99,
    created: new Date(),
  },

  {
    id: 2,
    name: "Frites",
    price: 6.99,
    created: new Date(),
  },

  {
    id: 3,
    name: "Boisson",
    price: 3.99,
    created: new Date(),
  },

  {
    id: 4,
    name: "Mini mac",
    price: 1.99,
    created: new Date(),
  },

  {
    id: 5,
    name: "Big Mac Menu Vegie",
    price: 10.0,
    created: new Date(),
  },
  {
    id: 10,
    name: "Big Tasty",
    price: 5.99,
    created: new Date(),
  },
];

/**
 * Récupère le produit dont l'id vaut `productId`
 * @param {*} productId
 */
const getProduct = (productId) => {
  return products.find((product) => product.id == productId);
};
/**
 * Supprime le produit dont l'id vaut `productId`
 * @param {*} productId
 */
const removeProduct = (productId) => {
  products = products.filter((product) => product.id != productId);
};
/**
 * Met à jour le produit dont l'id vaut `productId`
 * @param {*} productId
 * @param {*} updatedProduct
 */
const updateProduct = (productId, updatedProduct) => {
  products = products.map((product) =>
    product.id == productId ? updatedProduct : product
  );
};
/**
 * Génère et retourne le prochain id des produits
 * @param {*} products
 */
const getUniqueId = () => {
  const productsIds = products.map((product) => product.id);
  const maxId = productsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};

// On exporte cette tableau "products" pour l'utiliser ailleur
export { products };
