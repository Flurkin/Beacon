var Mongoose = require('../database').Mongoose;

//create the schema
var imageSchema = new Mongoose.Schema({
	image: {
    type: String,
    required: true
  },
    incident: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true
  }
});

//create the model and add it to the exports
module.exports = Mongoose.model('Image', imageSchema, 'Images');
