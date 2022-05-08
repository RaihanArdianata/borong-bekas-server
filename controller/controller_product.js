const { Product, User, Cart } = require("../models");
const { encodeToken } = require("../helper/jwt.js");
const del = require("del");

class Controller {
  static get_all(req, res, next) {
    Product.findAll(
      {
        where: {
          qty: 1
        },
        order: [
          ['id', 'DESC'],
        ],
        include: [
          {
            model: User,
            required: true,
          },
          {
            model: Cart,
            required: false,
          }
        ]
      }
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static get_by_user(req, res, next) {
    Product.findAll(
      {
        where: {
          userID: req.CurrentUserId
        },
        order: [
          ['id', 'DESC'],
        ],
        attributes: {
          include: [[Product.sequelize.fn("COUNT", Product.sequelize.col("carts.id")), "cartCount"]]
        },
        include: [
          {
            model: User,
            required: true,
          },
          {
            model: Cart,
            required: true,
          }
        ]
      }
    )
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static get_product_by_id(req, res, next) {
    Product.findOne(
      {
        where: {
          id: req.params.id
        },
        include: [
          {
            model: User,
            required: true,
          }
        ]
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
    const product = {
      product_name: req.body.product_name,
      description: req.body.description,
      image: req.file.filename,
      price: +req.body.price,
      category: req.body.category,
      userID: req.CurrentUserId,
    };
    Product.create(product)
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
    const product = {
      product_name: req.body.product_name,
      description: req.body.description,
      image: req.file?.filename,
      price: +req.body.price,
      category: req.body.category,
      userID: req.CurrentUserId,
    };

    Product.update(product, {
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
    Product.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        const imageName = result.image;
        Product.destroy({
          where: {
            id,
          },
        })
          .then((result) => {
            del.sync(["./public/" + imageName]);
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
