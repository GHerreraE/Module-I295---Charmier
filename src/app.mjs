import express from "express";

const app = express(); // create express app
app.use(express.json());

const port = 3000; // on define le port

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
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id == productId);
  const message = `Le produit dont l'id vaut ${productId} a bien été récupéré.`;
  res.json(success(message, product));
});
