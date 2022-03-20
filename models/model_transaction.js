'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Transaction extends Model {}

  Transaction.init({
    total_price: {
      type: DataTypes.INTEGER
    },
  }, { hooks: {
    beforeCreate: (deliveryService, options) => {
    }
  }, sequelize })

  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.DeliveryService, {foreignKey: "deliveryServiceID", onDelete: 'cascade'})
    Transaction.belongsTo(models.PaymentMethod, {foreignKey: "paymentMethodID", onDelete: 'cascade'})
    Transaction.belongsTo(models.Product, {foreignKey: "ProductID", onDelete: 'cascade'})
    Transaction.belongsTo(models.User, {foreignKey: "UserID", onDelete: 'cascade'})
  };
  return Transaction;
};