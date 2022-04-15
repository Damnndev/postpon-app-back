// Controladores para las peticiones

const { response } = require('express');
const bcrypt = require('bcryptjs');
const  User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
// const { validate } = require('../models/User-model');


/* Creacción de usuarios */
const createUser = async(req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificamos si el usuario existe
    let user = await User.findOne({ email: email});
    // Si existe...
    if(user) {
      return res.status(400).json({
        ok: false,
        msg: 'El email proporcionado ya está registrado'
      });
    }
    // Si todo ok se guarda en la BD
    user = new User(req.body);

    // Encriptamos la password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // guardamos usuario en la bd
    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Contacte con el administrador'
    });
  }

}

/* Login Usuario */
const loginUser = async(req, res = response) => {

  const { email, password } = req.body;

  try {
     // Verificamos si el usuario existe
    let user = await User.findOne({ email: email});

    // Si no existe...
    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario con ese email no registrado'
      });
    }

    // Confirmamos la coincidencia de las passwords
    const validPass = bcrypt.compareSync(password, user.password);

    if(!validPass) {
      return res.status(400).json({
        ok: false,
        msg: 'Password no válido'
      });
    }

    // Generamos nuestro JWT
    const token = await generateJWT(user.id, user.name);


    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });


  } catch (error) {
     res.status(500).json({
      ok: false,
      msg: 'Contacte con el administrador'
    });
  }

}

/* revalidamos el token */
const renewToken = async (req, res = response) => {

  const { uid, name } = req;

  // Generamos un nuevo JWT y lo devolvemos en la petición
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token: token
  });
}




module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  renewToken: renewToken
}