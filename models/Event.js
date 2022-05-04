// Definición del modelo para crear eventos en la BD Mongo

const { Schema, model } = require('mongoose');


const EventSchema = Schema({


  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
      type: Date,
      required: true
  },
  user: {
    type: Schema.Types.ObjectId, // especificamos referencia
    ref: 'User',
    required: true
  }

});


// Extraemos la versión y el id devolvemos lo demás dentro de object
// solo función visualización
EventSchema.method('toJSON', function() {
  const{ __v, _id,  ...object} = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Event', EventSchema);

