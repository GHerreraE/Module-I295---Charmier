// Importantion de la dependence express
import express from "express";
import { sequelize } from "./db/sequelize.mjs";
import { initDb } from "./db/sequelize.mjs";

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
