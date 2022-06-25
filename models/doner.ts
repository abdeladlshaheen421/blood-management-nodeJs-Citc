"use strict";
import { Model, Sequelize } from "sequelize";
interface DonerInterface {
  id?: Number;
  nationalId: string;
  name: string;
  city: string;
  email: string;
}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Doner extends Model<DonerInterface> implements DonerInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: Number;
    nationalId!: string;
    name!: string;
    city!: string;
    email!: string;
    static associate(models: any) {
      // define association here
      Doner.hasMany(models.BloodStock);
    }
  }
  Doner.init(
    {
      nationalId: DataTypes.STRING,
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doner",
    }
  );
  return Doner;
};
