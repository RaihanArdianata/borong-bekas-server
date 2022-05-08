const {
  Transaction,
  Product,
  DeliveryService,
  PaymentMethod,
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
          model: PaymentMethod,
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
          model: PaymentMethod,
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
    const transactionData = {
      total_price: 0,
      userID: req.CurrentUserId,
      paymentMethodID: +req.body.paymentMethodId,
      deliveryServiceID: +req.body.deliveryServiceId,
    };
    const transaction = await sequelize.transaction()

    try {
      transaction.commit()
    } catch (error) {
      transaction.rollback()
    }
  }
}

module.exports = Controller;
