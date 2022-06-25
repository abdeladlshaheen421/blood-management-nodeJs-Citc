"use strict";
import { Model, Sequelize } from "sequelize";
interface DonerInterface {
  id?: Number;
  name: string;
}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Hospital extends Model<DonerInterface> implements DonerInterface {
    /**"use strict";
import { Model, Sequelize } from "sequelize";
interface DonerInterface {
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    static associate(models: any) {
      // define association here
      // Hospital.hasMany(models.bloodRequests)
    }
  }
  Hospital.init(
    {
      name: DataTypes.STRING,
    },
    
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
