const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID , // UUID
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    healthScore:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false      
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false      
    },

    DB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {timestamps:false} );
};
