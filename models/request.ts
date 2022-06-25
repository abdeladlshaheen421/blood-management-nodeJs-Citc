"use strict";
import { Model,Sequelize } from "sequelize";
module.exports = (sequelize:Sequelize, DataTypes:any) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      Request.belongsTo(models.Hospital)
    }
  }
  Request.init(
    {
      bloodType: DataTypes.STRING,
      city: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      patientStatus:DataTypes.ENUM({values:['immediate','Urgent','Normal']}),
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
