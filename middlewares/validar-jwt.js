const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

  // x-tooken headers
  const token = req.header('x-token');

  // Si token no existe
  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No existe token en la petición'
    });
  }

  // Si token existe
  try {

    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

  next();

}


module.exports = {
  validateJWT
}