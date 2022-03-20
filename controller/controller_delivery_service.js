const { DeliveryService } = require("../models");

class Controller {
  static get_all(req, res, next) {
    DeliveryService.findAll({
      order: [["id", "DESC"]],
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static create(req, res, next) {
    const deliveryService = {
      expedition_name: req.body.expedition_name,
      price: req.body.price,
    };

    DeliveryService.create(deliveryService)
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
    const deliveryService = {
      expedition_name: req.body.expedition_name,
      price: req.body.price,
    };
    console.log(deliveryService, "hi", id);
    DeliveryService.update(deliveryService, {
      where: {
        id,
      },
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static delete(req, res, next) {
    const id = req.params.id;

    DeliveryService.findOne({
        where: {
          id,
        },
      })
      .then((result) => {
        DeliveryService.destroy({
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
