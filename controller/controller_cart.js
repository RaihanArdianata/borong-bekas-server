const { Product, User, Cart } = require("../models");

class Controller {
    static get_all(req, res, next) {
        console.log('masuk');
        Cart.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
                include: [
                    {
                        model: Product,
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

    static get_by_user(req, res, next) {
        Cart.findAll(
            {
                where: {
                    userID: req.CurrentUserId
                },
                order: [
                    ['id', 'DESC'],
                ],
                include: [
                    {
                        model: Product,
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
        Cart.findOne(
            {
                where: {
                    id: req.params.id
                },
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
        console.log( req.body);
        const cart = {
            // qty: req.body.qty,
            productID: req.body.productID,
            userID: req.CurrentUserId,
        };
        Cart.findOne({
            where: {
                productID: cart.productID,
            },
        }).then((result) => {
            if (result) {
                return res.status(200).json({
                    message: 'product already in cart'
                });
            }
            Cart.create(cart)
                .then((result) => {
                    return res.status(201).json(result);
                })
                .catch((err) => {
                    console.log(err);
                    return next(err);
                });
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    }

    //put
    static update(req, res, next) {

        const id = req.params.id;
        const cart = {
            // qty: req.body.qty,
            productID: req.body.productID,
            userID: req.CurrentUserId,
        };

        Cart.update(cart, {
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
        Cart.findOne({
            where: {
                id,
            },
        })
            .then((result) => {
                Cart.destroy({
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
