import { Sequelize, DataTypes } from "sequelize";
import { ProductModel } from "../models/products.mjs";
import { products } from "./mock-product.mjs";

const sequelize = new Sequelize("db_products", "root", "root", {
  host: "localhost",
  port: "6033",
  dialect: "mysql",
  logging: false,
});

// Le modèle product
const Product = ProductModel(sequelize, DataTypes);
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      importProducts();
      console.log("La base de données db_products a bien été synchronisée");
    });
};
const importProducts = () => {
  // import tous les produits présents dans le fichier db/mock-product
  products.map((product) => {
    Product.create({
      name: product.name,
      price: product.price,
    }).then((product) => console.log(product.toJSON()));
  });
};

export { sequelize, initDb, Product };
