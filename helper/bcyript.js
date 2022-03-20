const bcrypt = require('bcryptjs');

function encodePassword(password) {
  const salt = bcrypt.genSaltSync(10); //dificullt password
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

function decodePassword(password, hash) {
  const result = bcrypt.compareSync(password, hash);
  return result
}


module.exports = {
  encodePassword,
  decodePassword
}