const { PaymentMethod } = require("../models");

class Controller {
  static get_all(req, res, next) {
    PaymentMethod.findAll(
      {
        order: [
          ['id', 'DESC'],
        ],
      }
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static create(req, res, next) {

    const paymentMethod = {
      name: req.body.name,
      type: req.body.type,
    };

    PaymentMethod.create(paymentMethod)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      });
  }

  //put
  static update(req, res, next) {

    const id = req.params.id;
    const paymentMethod = {
        name: req.body.name,
        type: req.body.type,
    };
    
    PaymentMethod.update(paymentMethod, {
      where: {
        id,
      },
    })
      .then((result) => {
        return res.status(200).json();
      })
      .catch((err) => {
        return next(err);
      });
  }

  static delete(req, res, next) {
    const id = req.params.id;
    PaymentMethod.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        PaymentMethod.destroy({
          where: {
            id,
          },
        })
          .then((result) => {
            return res.status(200).json({ result });
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
