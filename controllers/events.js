
// Controladores eventos CRUD

const { response } = require('express');
const Event = require('../models/Event')

// Leemos los eventos
const getEvent = async(req, res = response) => {

  // Traemos todos los eventos
  const events = await Event.find()
                            .populate('user', 'name'); // buscamos con .populate en la colección de usuarios el que tenga ese ID y name

  res.json({
     ok: true,
     events: events
  });
}

// Creamos evento
const createEvent = async(req, res = response) => {

  // verificamos que tenemos el evento
  const event = new Event(req.body);

  try {

    event.user = req.uid;

   const eventSave = await event.save();

     res.json({
      ok: true,
      event: eventSave
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Diríjase al administrador'
    });
  }

}

// Actualizamos evento
const updateEvent = async(req, res = response) => {

  // recuperamos id del evento
  const eventId = req.params.id;
  const uid = req.uid;

  // Comprobamos si el evento existe
  try {

    const event = await Event.findById(eventId);

    if(!event) {
     return res.status(404).json({
        ok: false,
        msg: 'No existe un evento con ese Id'
      });
    }

    // En caso de existir comprobamos que el evento corresponda con el id de usuario para editarlo
    if(event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para editar evento'
      });
    }

    // Si llega hasta este punto es la misma persona que crea el evento y lo puede editar
    // se genera un nuevo evento
    const newEvent = {
      ...req.body, // desestructuramos lo q contiene el body (title, start, end, notes...)
      user: uid
    }

    // actualizamos el evento viejo con el newEvent
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: updatedEvent
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Póngase en contacto con el administrador'
    });
  }

}

// Borramos evento
const deleteEvent = async(req, res = response) => {

  // recuperamos id del evento
  const eventId = req.params.id;
  const uid = req.uid;

  const event = await Event.findById(eventId);

  try {

    if(!event) {
     return res.status(404).json({
        ok: false,
        msg: 'No existe un evento con ese Id'
      });
    }

    // En caso de existir comprobamos que el evento corresponda con el id de usuario para editarlo
    if(event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para eliminar este evento'
      });
    }

    // Eliminamos el evento
    await Event.findByIdAndDelete(eventId)

    res.json({
      ok: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Póngase en contacto con el administrador'
    });
  }
}


module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}
