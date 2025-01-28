// Importation de la dependence express
import express from "express";
// Importation des liste de produits
import { products } from "../db/mock-product.mjs";
import { success } from "./helper.mjs";
import { Product } from "../db/sequelize.mjs";

// Instance d'express avec express
const productsRouter = express();

// Route permettant de récupérer tous les produits dans le DB
// Retourne la liste des produits en JSON pour le consommateur (client)
// route => api/produits
productsRouter.get("/", (req, res) => {
  // Modèle Product qui appel la fonction findAll de l'ORM Sequelize
  // .then c'est une promesse qui gère les operation sync
  // .then execute une tache après l'autre.
  Product.findAll().then((products) => {
    const message = "La liste des produits a bien été récupérée.";

    // res = resultat
    // json = c'est le type de format dont le resultat va sortir
    // success = c'est la méthode en HELPER avec ces paramètres
    res.json(success(message, products));
  });
});

// Route permettant de récupérer juste un produit avec le ID
productsRouter.get("/:id", (req, res) => {
  // Model Product qui apelle la fonction findByPk
  // findByPk a des paramètres par default
  // .then execute cette tache (si ya pas une autre)
  Product.findByPk(req.params.id).then((product) => {
    const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;

    // res = resultat
    // json = c'est le type de format dont le resultat va sortir
    // success = c'est la méthode en HELPER avec ces paramètres
    res.json(success(message, product));
  });
});

// Route permettant de créer un produit
productsRouter.post("/", (req, res) => {
  // Méthode Sequelize qui permet inserer des données dans la db
  // Les paramètres aussi sont par default => pas besoin de les faires
  // .then execute cette tache après l'autre
  Product.create(req.body).then((createdProduct) => {
    // Définir un message pour le consommateur de l'API REST
    const message = `Le produit ${createdProduct.name} a bien été créé !`;
    // Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, createdProduct));
  });
});

// Route permettant d'effacer un produit avec le ID
productsRouter.delete("/:id", (req, res) => {
  // Méthode sequelize => findByPK qui permet select un produit
  // Paramètres => Par default
  // .then
  Product.findByPk(req.params.id).then((deletedProduct) => {
    Product.destroy({
      where: { id: deletedProduct.id },
    }).then((_) => {
      // Définir un message pour le consommateur de l'API REST
      const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, deletedProduct));
    });
  });
});

productsRouter.put("/:id", (req, res) => {
  const productId = req.params.id;

  Product.update(req.body, { where: { id: productId } }).then((_) => {
    Product.findByPk(productId).then((updatedProduct) => {
      // Définir un message pour l'utilisateur de l'API REST
      const message = `Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec succès`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, updatedProduct));
    });
  });
});

export { productsRouter };
