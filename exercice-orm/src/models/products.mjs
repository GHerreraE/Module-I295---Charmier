// https://sequelize.org/docs/v7/models/data-types/

// const qui instancie Sequelize pour interagir la db
// Datatypes = les types de données dispo pour definir les collones d'une table
const ProductModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product", // Nom du modele => Nom de la table par default
    {
      id: {
        type: DataTypes.INTEGER, //int
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING, //string pour stocker les noms
        allowNull: false,
        // validation pour le nom à entrer
        validate: {
          // seulement les lettres + espaces + tiret
          is: {
            // formule pour accepter juste les lettres+espaces+tiret
            args: /^[A-Za-z\-\s]*$/,
            // message pour l'user
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          // validation pour que l'utilisateur n'envoie pas un champ vide
          notEmpty: {
            // message pour l'user
            msg: "Le nom ne peut pas être vide.",
          },
          // validation pour l'user => exemple => l'user oublie le {name:"name"}
          notNull: {
            msg: "Le nom est une propriété obligatoire.",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT, //float pour les prix à virgule
        allowNull: false,
        // validation pour le prix
        validate: {
          // validation = juste chiffres avec des virgules
          isFloat: {
            msg: "Utilisez uniquement des nombres pour le prix.",
          },
          // validation = pas vide
          notEmpty: {
            msg: "Le prix ne peut pas être vide.",
          },
          // validation = oublie de mettre le prix
          notNull: {
            msg: "Le prix est une propriété obligatoire.",
          },
        },
      },
    },
    {
      timestamps: true, // true => timestamps pour les dates de création/modification
      createdAt: "created", // ca renomme les createAt par created = pour l'enregistrement à chaque changement ou création
      updatedAt: false,
    }
  );
};

// exporpotation de cette structure
export { ProductModel };
