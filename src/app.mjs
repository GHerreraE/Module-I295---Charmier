// Importantion de la dependence express
import express from "express";
import { sequelize } from "./db/sequelize.mjs";
import { initDb } from "./db/sequelize.mjs";
// Importation des methodes pour mettre une limite à la recherches des products
import { ValidationError, Op } from "sequelize";

// On crée une instance avec la constant APP
// APP permetra gerer les routes, recevoir et envoyer les requetes
const app = express();

app.use(express.json());

// Define le port => 3000
const port = 3000;

app.get("/", (req, res) => {
  res.send("API REST of self service machine !");
});
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

// importation des produits
import { productsRouter } from "./routes/products.mjs";
// utilisation de router pour les produits et on les met dans /api/products
// tous les routes qui commence par /api/products seront redirigé vers productsRouter
app.use("/api/products", productsRouter);

// nouvelle route pour les /api/login
import { loginRouter } from "./routes/login.mjs";
app.use("/api/login", loginRouter);

// Démarre le serveur avec le port defini, en affichant un message sur la console.
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);
  const message = `Le produit dont l'id vaut ${productId} a bien été récupéré.`;
  res.json(success(message, product));
});

// route pour la liste de produits GET /api/products?name=a&limit=1
productsRouter.get("/", (req, res) => {
  // condition avec parametres par default et le name
  if (req.query.name) {
    // condition pour le min de caracteres
    if (req.query.name.length < 2) {
      // message
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      // retourne de reponse avec message
      return res.status(400).json({ message });
    }
    // variable pour mettre une limite user pour les recherches
    let limit = 3;
    // detecte et verifie si les limites existent
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    return Product.findAndCountAll({
      // si le name es like le nom que l'user a fourni alors
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      // order by name
      order: ["name"],
      // limite de 3
      limit: limit,
    }).then((products) => {
      // il retourne a message avec la quantité de produits qui se trouvent
      const message = `Il y a ${products.length} produits qui correspondent au terme de la recherche`;
      // et aussi retourne la liste de produits trouvé
      res.json(success(message, products));
    });
  }
  // on cherche dans toute la liste des produits, et on ordonne = ORDER BY NAME
  Product.findAll({ order: ["name"] })
    // verification pour la recueperation de la liste de produits
    .then((products) => {
      const message = "La liste des produits a bien été récupérée.";
      // message avec la liste de produits
      res.json(success(message, products));
    })
    .catch((error) => {
      // catch avec "error" importé tout en haut, pour gerer dans le cas que la liste
      // ne soit pas recupéré.
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Si aucune route ne correspondant à l'URL demandée par le consommateur
app.use(({ res }) => {
  // constant pour stocker ce message
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  // reponse avec le status 404 + message en JSON = Le serveur n'a pas trouvé ce qui était demandé
  res.status(404).json(message);
});
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

initDb();
