'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Cart extends Model {}
  // 1 in cart
  // 2 waiting payment
  // 3 payment success waiting seller send product
  // 4 on going
  // 5 done
  Cart.init({
    qty: {
      type: DataTypes.INTEGER
    },
    row_status:{
        type: DataTypes.INTEGER
    }
  }, { hooks: {
    beforeCreate: (product, options) => {
      product.qty = 1
    }
  }, sequelize })

  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.User, {foreignKey: "userID", onDelete: 'cascade'})
    Cart.belongsTo(models.Product, { foreignKey: "productID", onDelete: 'cascade'});
  };
  return Cart;
};