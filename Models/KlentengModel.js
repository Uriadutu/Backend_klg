import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Klenteng = db.define(
  "klenteng",
  {
    nama_klenteng: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Klenteng);
Klenteng.belongsTo(User, { foreignKey: "userId" });

export default Klenteng;
