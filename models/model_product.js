'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
    category:{
      type: DataTypes.STRING
    },
  }, { hooks: {
    beforeCreate: (product, options) => {
      product.qty = 1
    }
  }, sequelize })

  Product.associate = function (models) {
    // associations can be defined here
    // Product.hasMany(models.Cart,{foreignKey: "ProductId", onDelete: 'cascade'})
    Product.belongsTo(models.User, {foreignKey: "userID", onDelete: 'cascade'})
    Product.hasOne(models.Transaction, { foreignKey: "productID", onDelete: 'cascade'});
  };
  return Product;
};