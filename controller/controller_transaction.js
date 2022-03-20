const {
  Transaction,
  Product,
  DeliveryService,
  PaymentMethod,
  User,
} = require("../models");
const { encodeToken } = require("../helper/jwt.js");

class Controller {
  static getAllTransaction(req, res, next) {
    Transaction.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Product,
          // required: true,
        },
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
          model: Product,
          required: true,
        },
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

  static createTransaction(req, res, next) {
    const transaction = {
      total_price: 0,
      userID: req.CurrentUserId,
      productID: +req.body.productId,
      paymentMethodID: +req.body.paymentMethodId,
      deliveryServiceID: +req.body.deliveryServiceId,
    };

    console.log(transaction);

    Product.findOne({
      where: {
        id: transaction.productID,
      },
    })
      .then((product_result) => {
        DeliveryService.findOne({
          where: {
            id: transaction.deliveryServiceID,
          },
        })
          .then((delivery_result) => {
            Transaction.create({...transaction, total_price: delivery_result.price + product_result.price})
              .then((result) => {
                Product.update({qty: 0}, {
                  where: {
                    id: transaction.productID,
                  },
                })
                return res.status(201).json(result);
              })
              .catch((err) => {
                console.log(err);
                return next(err);
              });
          })
          .catch((err) => {
            return next(err);
          });
      })
      .catch((err) => {
        return next(err);
      });
  }
}

module.exports = Controller;
