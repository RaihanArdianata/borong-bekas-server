'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Transaction extends Model { }

  // 1 in cart
  // 2 waiting payment
  // 3 payment success waiting seller send product
  // 4 on going
  // 5 done
  Transaction.init({
    total_price: {
      type: DataTypes.INTEGER
    },
    row_status: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate: (deliveryService, options) => {
      }
    }, sequelize
  })

  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.DeliveryService, { foreignKey: "deliveryServiceID", onDelete: 'cascade' })
    Transaction.belongsTo(models.PaymentMethod, { foreignKey: "paymentMethodID", onDelete: 'cascade' })
    Transaction.hasMany(models.TransactionLine, { foreignKey: "TransactionLineID", onDelete: 'cascade' })
    Transaction.belongsTo(models.User, { foreignKey: "UserID", onDelete: 'cascade' })
    Transaction.belongsTo(models.Address, { foreignKey: "addressID", onDelete: 'cascade', onUpdate: 'cascade' })
  };
  return Transaction;
};