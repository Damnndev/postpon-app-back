// Librería JWT
const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name };

    // Firmamos token (payload, claveprivada, opciones, callback en caso de error)
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {

      if(err) {
        console.log(err);
        reject('No ha sido posible generar el token');
      }

      resolve(token);
    })
  });

}



module.exports = {
  generateJWT
}