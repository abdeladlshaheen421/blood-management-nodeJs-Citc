"use strict";
import { Model, Sequelize } from "sequelize";
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class BloodStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      BloodStock.belongsTo(models.Doner);
    }
  }
  BloodStock.init(
    {
      bloodType: DataTypes.ENUM({
        values: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
      }),
      donateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expireDate: {
        type: DataTypes.DATE,
      }, //42Days for expiration
    },
    {
      sequelize,
      modelName: "BloodStock",
    }
  );
  return BloodStock;
};
