// Importation de la dependence express
import express from "express";
// Importation des liste de produits
import { products } from "../db/mock-product.mjs";
import { success } from "./helper.mjs";
import { Product } from "../db/sequelize.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";

// Instance d'express avec express
const productsRouter = express();

/**
 * @swagger
 * /api/products/:
 *  get:
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    summary: Retrieve all products.
 *    description: Retrieve all products. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: All products.
 *        content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The product ID.
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: The product's name.
 *                    example: Big Mac
 *                  price:
 *                    type: number
 *                    description: The product's price.
 *                    example: 5.99
 *
 */

// Route permettant de récupérer tous les produits dans le DB
// Retourne la liste des produits en JSON pour le consommateur (client)
// route => api/produits
productsRouter.get("/", auth, (req, res) => {
  // validation pour compter les nombrs de terme qui se trouvent avec une meme recherce => C'est un COUNT en SQL
  if (req.query.name) {
    // retourn de message
    return Product.findAll({
      // requete pour chercher les produits qui sont du meme nom qu'on cherche
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      // on limite l'affichage de resultat à trois
      limit: 3,
    }).then((products) => {
      // message qui dit, combien de produits on été trouvé
      const message = `Il y a ${products.count} produits qui correspondent au terme de la recherche`;
      res.json(success(message, products));
    });
  }

  // Modèle Product qui appel la fonction findAll de l'ORM Sequelize
  // .then c'est une promesse qui gère les operation sync
  // .then execute une tache après l'autre.
  Product.findAll()
    .then((products) => {
      const message = "La liste des produits a bien été récupérée.";

      // res = resultat
      // json = c'est le type de format dont le resultat va sortir
      // success = c'est la méthode en HELPER avec ces paramètres
      res.json(success(message, products));
    })
    // .catch pour gèrer une sortie si la liste n'est pas bien recuperer
    // error = permet de savoir quelle erreur est produit
    .catch((error) => {
      // constant pour afficher le message d'erreur
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      //reponse pour le status 500 en format JSON, => Message + Message de la part du serveur (erreurs)
      res.status(500).json({ message, data: error });
    });
});

// Route permettant de récupérer juste un produit avec le ID
productsRouter.get("/:id", auth, (req, res) => {
  // Model Product qui apelle la fonction findByPk
  // findByPk a des paramètres par default
  // .then execute cette tache (si ya pas une autre)
  Product.findByPk(req.params.id)
    .then((product) => {
      // si le produit avec l'ID demandé n'existe pas, alors on retourne un message
      if (product === null) {
        // message pour dire que le produit n'existe pas
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        // retourne de message => erreur 404 => page not found + message
        return res.status(404).json({ message });
      }
      // si le produit avec l'ID demandé est trouvé, alors on l'affiche
      const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
      // res = resultat
      // json = c'est le type de format dont le resultat va sortir
      // success = c'est la méthode en HELPER avec ces paramètres
      res.json(success(message, product));
    })
    // catch pour gerer l'erreur de serveur
    .catch((error) => {
      // message pour dire que le produit n'est pas récupéré
      const message =
        "Le produit n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      // retourne le message avec le code de erreur => server error + message
      res.status(500).json({ message, data: error });
    });
});

// Route permettant de créer un produit
productsRouter.post("/", (auth, req, res) => {
  // Méthode Sequelize qui permet inserer des données dans la db
  // Les paramètres aussi sont par default => pas besoin de les faires
  // .then execute cette tache après l'autre
  Product.create(req.body)
    .then((createdProduct) => {
      // Définir un message pour le consommateur de l'API REST
      const message = `Le produit ${createdProduct.name} a bien été créé !`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, createdProduct));
    })
    .catch((error) => {
      // validation pour la création d'un produit
      // condition qui va chercher le modelProducts
      // ValidationError c'est une instance de sequelize
      if (error instanceof ValidationError) {
        // retourne de message erreur page not found + message avec l'erreur => est géré par sequelize
        return res.status(400).json({ message: error.message, data: error });
      }
      // message pour dire que le produit n'est pas récupéré
      const message =
        "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      // retourne le message avec le code de erreur => server error + message
      res.status(500).json({ message, data: error });
    });
});

// Route permettant d'effacer un produit avec le ID
productsRouter.delete("/:id", auth, (req, res) => {
  // Méthode sequelize => findByPK qui permet select un produit
  // Paramètres => Par default
  // .then
  Product.findByPk(req.params.id)
    .then((deletedProduct) => {
      // si le produit à vouloir destroy n'est pas trouvé, donc
      if (deletedProduct === null) {
        // message à stocker
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        // retourne de message avec le status 404
        return res.status(404).json({ message });
      }
      // si le produit est trouvé, alors on le supprime
      return Product.destroy({
        where: { id: deletedProduct.id },
      }).then((_) => {
        // Définir un message pour le consommateur de l'API REST
        const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, deletedProduct));
      });
    })
    .catch((error) => {
      // message pour dire que le produit n'est pas récupéré
      const message =
        "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      // retourne le message avec le code de erreur => server error + message
      res.status(500).json({ message, data: error });
    });
});

// Route permettant de changer les données dans la base de données
productsRouter.put("/:id", auth, (req, res) => {
  // constant pour modifier la donnée du produit avec l'ID recherché
  const productId = req.params.id;
  // Update avec l'ID
  return Product.update(req.body, { where: { id: productId } })
    .then((_) => {
      Product.findByPk(productId).then((updatedProduct) => {
        // si le produit demandé n'existe pas, donc aura pas de changements => erreur
        if (updatedProduct === null) {
          const message =
            "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          // A noter ici le return pour interrompre l'exécution du code
          return res.status(404).json({ message });
        }
        // Définir un message pour l'utilisateur de l'API REST
        // Message à afficher dans le cas que l'update est done
        const message =
          "Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec ...";
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, updatedProduct));
      });
    }) // catch si l'erreur est de coté server, mais cette fois pour tout l'update + message
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      // reponse avec le status 500 + message
      res.status(500).json({ message, data: error });
    });
});

export { productsRouter };
