// model pour créer une table pour stocker les utilisateurs
const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    // User = nom de la table
    // id pour user
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // user nameeee
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Ce username est déjà pris." },
    },
    // passwordddddd
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
export { UserModel };
