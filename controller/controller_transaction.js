const {
  Transaction,
  Product,
  DeliveryService,
  User,
  sequelize
} = require("../models");
const { encodeToken } = require("../helper/jwt.js");

class Controller {
  static getAllTransaction(req, res, next) {
    Transaction.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: DeliveryService,
          // required: true,
        },
        {
          model: User,
          // required: true,
        },
      ],
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static getMyTransaction(req, res, next) {
    Transaction.findAll({
      where: {
        userID: req.CurrentUserId,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: DeliveryService,
          required: true,
        },
        {
          model: User,
          required: true,
        },
      ],
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static async createTransaction(req, res, next) {

    try {
      req.body.product.forEach(({ Product }) => {
        const transactionData = {
          userID: req.CurrentUserId,
          total_price: Product.price,
          addressID: req.body.addressID,
          deliveryServiceID: req.body.deliveryServiceId,
          productID: Product.id
        };
        console.log(transactionData);
        Transaction.create(transactionData)
      });

      return res.status(201).json({
        message: 'success'
      });
    } catch (error) {
      return next(err);
    }
  }
}

module.exports = Controller;
