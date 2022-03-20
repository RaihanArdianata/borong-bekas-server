"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class DeliveryService extends Model {}

  DeliveryService.init(
    {
      expedition_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCreate: (deliveryService, options) => {},
      },
      sequelize,
    }
  );

  DeliveryService.associate = function (models) {
    // associations can be defined here
    DeliveryService.hasMany(models.Transaction, { foreignKey: "deliveryServiceID", onDelete: "cascade",});
  };
  return DeliveryService;
};
