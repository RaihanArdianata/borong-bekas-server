'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Transaction extends Model { }

  // 1 payment success waiting seller send product
  // 2 on going
  // 3 done
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
        user.row_status = 1
      }
    }, sequelize
  })

  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.DeliveryService, { foreignKey: "deliveryServiceID", onDelete: 'cascade' })
    Transaction.belongsTo(models.Product, { foreignKey: "productID", onDelete: 'cascade'});
    Transaction.belongsTo(models.User, { foreignKey: "userID", onDelete: 'cascade' })
    Transaction.belongsTo(models.Address, { foreignKey: "addressID", onDelete: 'cascade', onUpdate: 'cascade' })
  };
  return Transaction;
};