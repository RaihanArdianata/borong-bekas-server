const { Address } = require("../models");

class Controller {
    static get_all(req, res, next) {
        Address.findAll(
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

    static get_by_user(req, res, next) {
        Address.findAll(
            {
                where: {
                    userID: req.CurrentUserId
                },
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

    static get_address_by_id(req, res, next) {
        Address.findOne(
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
        const address = {
            // qty: req.body.qty,
            address: req.body.addres,
            isActive: req.isActive,
        };
        Address.create(address)
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
        const address = {
            // qty: req.body.qty,
            address: req.body.address,
            isActive: req.isActive,
        };

        Address.update(address, {
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
        Address.findOne({
            where: {
                id,
            },
        })
            .then((result) => {
                Address.destroy({
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
