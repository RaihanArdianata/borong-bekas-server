'use strict';

const { encodePassword } = require('../helper/bcyript.js')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        isUnik(email, done) {
          User.findOne({
            where: {
              email
            }
          })
            .done((result) => {
              if (result) {
                done(new Error('Emial alerdy taken'))
              }
              done()
            })
        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: 1,
          msg: 'Email is required'
        },
      }
    },
    no_tel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encodePassword(user.password);
      }
    }, sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product, { foreignKey: "userID", onDelete: 'cascade' })
    User.hasMany(models.Address, { foreignKey: "userID", onDelete: 'cascade' })
    // User.hasMany(models.Transaction, { foreignKey: "userID", onDelete: 'cascade' })
  };
  return User;
};