import { Sequelize, DataTypes } from "sequelize";
import { ProductModel } from "../models/products.mjs";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.mjs";
const sequelize = new Sequelize(
  "db_products", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: 6033,
    dialect: "mysql",
    logging: false,
  }
);
import { products } from "./mock-product.mjs";
// Le modèle product
const Product = ProductModel(sequelize, DataTypes);

// variable pour initialiser la base de données (produits et users)
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      importProducts();
      importUsers();
      console.log(
        "La base de données db_products a bien été synchronisée avec les users"
      );
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

// création de nouvelle constante pour utiliser la méthode create from
const User = UserModel(sequelize, DataTypes);

// importation de la table de users
const importUsers = () => {
  // appell librery
  bcrypt
    .hash("etml", 10) // temps pour hasher = du sel
    .then((hash) =>
      // creation d'un user ETML avec le mot de passe haché
      User.create({
        username: "etml",
        password: hash,
      })
    )
    .then((user) => console.log(user.toJSON()));
};
export { sequelize, initDb, Product, importUsers };
