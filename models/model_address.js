'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Address extends Model {}

  Address.init({
    address: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  }, { hooks: {
    // beforeCreate: (product, options) => {
    //   product.qty = 1
    // }
  }, sequelize })

  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(models.User, {foreignKey: "userID", onDelete: 'cascade'})
    // Address.hasMany(models.transaction)
  };
  return Address;
};