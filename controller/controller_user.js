const { User } = require("../models");
const { encodeToken } = require("../helper/jwt.js");
const { decodePassword } = require("../helper/bcyript.js");

class Controller {

  static registerSeller(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      nama: req.body.nama,
      no_tel: req.body.no_tel,
      alamat: req.body.alamat,
      role: 2,
    };
    User.create(user)
      .then((result) => {
        const payload = {
          id: result.id,
          password: result.password,
        };
        const token = encodeToken(payload);

        return res.status(201).json({
          id: result.id,
          email: result.email,
          // access_token : token
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static loginSeller(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      role: 2,
    };
    User.findOne({
      where: {
        email: user.email,
        role: user.role
      },
    })
      .then((result) => {
        if (result) {
          console.log(result.password);
          const compare = decodePassword(req.body.password, result.password);
          if (compare) {
            const payload = {
              id: result.id,
              password: result.password,
            };
            const token = encodeToken(payload);
            return res.status(200).json({
              nama: result.nama,
              email: result.email,
              no_tel: result.no_tel,
              alamat: result.alamat,
              role: result.role,
              access_token: token,
            });
          } else {
            return next({
              name: "NotFound",
              errors: [
                {
                  status: 404,
                  message: "Email/Password Salah",
                },
              ],
            });
          }
        } else {
          return next({
            name: "NotFound",
            errors: [
              {
                status: 404,
                message: "Email/Password Salah",
              },
            ],
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }

  static register(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      nama: req.body.nama,
      no_tel: req.body.no_tel,
      alamat: req.body.alamat,
      role: 1,
    };
    User.create(user)
      .then((result) => {
        const payload = {
          id: result.id,
          password: result.password,
        };
        const token = encodeToken(payload);

        return res.status(201).json({
          id: result.id,
          email: result.email,
          // access_token : token
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static login(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      role: 1,
    };
    User.findOne({
      where: {
        email: user.email,
      },
    })
      .then((result) => {
        if (result) {
          console.log(result.password);
          const compare = decodePassword(req.body.password, result.password);
          if (compare) {
            const payload = {
              id: result.id,
              password: result.password,
            };
            const token = encodeToken(payload);
            return res.status(200).json({
              nama: result.nama,
              email: result.email,
              no_tel: result.no_tel,
              alamat: result.alamat,
              access_token: token,
              role: result.role
            });
          } else {
            return next({
              name: "NotFound",
              errors: [
                {
                  status: 404,
                  message: "Email/Password Salah",
                },
              ],
            });
          }
        } else {
          return next({
            name: "NotFound",
            errors: [
              {
                status: 404,
                message: "Email/Password Salah",
              },
            ],
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  }

  //put
  static update(req, res, next) {
    const id = req.params.id
    const user = {
      email: req.body.email,
      password: req.body.password,
      nama: req.body.nama,
      no_tel: req.body.no_tel,
      alamat: req.body.alamat,
    };
    User.update(user, {
      where: {
        id
      }
    })
      .then((result) => {
        return res.status(200).json()
      })
      .catch((err) => {
        return next(err)
      })
  }

  static delete(req, res, next) {
    const id = req.params.id
    console.log('id ' + id);
    User.findOne({
      where: {
        id
      }
    })
      .then((result) => {
        User.destroy({
          where: {
            id
          }
        })
          .then((result) => {
            return res.status(200).json({ result })
          })
          .catch((err) => {
            return next(err)
          })
      })
      .catch((err) => {
        return next(err)
      })
  }
}

module.exports = Controller;
