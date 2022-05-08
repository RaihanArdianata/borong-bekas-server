'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class TransactionLine extends Model {}

  TransactionLine.init({
  }, { hooks: {
    beforeCreate: (deliveryService, options) => {
    }
  }, sequelize })

  TransactionLine.associate = function (models) {
    // associations can be defined here
    TransactionLine.belongsTo(models.Product, {foreignKey: "ProductID", onDelete: 'cascade'})
    TransactionLine.belongsTo(models.Transaction, {foreignKey: "TransactionID", onDelete: 'cascade'})
  };
  return TransactionLine;
};