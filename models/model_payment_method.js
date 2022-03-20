'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class PaymentMethod extends Model {}

  PaymentMethod.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
  }, { hooks: {
    beforeCreate: (paymentMethod, options) => {
    }
  }, sequelize })

  PaymentMethod.associate = function (models) {
    // associations can be defined here
    // Product.hasMany(models.Cart,{foreignKey: "ProductId", onDelete: 'cascade'})
    PaymentMethod.hasMany(models.Transaction,{foreignKey: "paymentMethodID", onDelete: 'cascade'})
  };
  return PaymentMethod;
};