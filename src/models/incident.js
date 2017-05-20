var Mongoose = require('../database').Mongoose;

//create the schema
var incidentSchema = new Mongoose.Schema({
	title: {
    type: String,
    required: true
  },
	description: {
    type: String,
    required: true
  },
	severity: {
    type: String,
    required: true
  },
	reporter: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
	latitude: {
    type: Number,
    required: true,
  },
	longitude: {
    type: Number,
    required: true,
  },
	creationDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

//create the model and add it to the exports
module.exports = Mongoose.model('Incident', incidentSchema, 'Incidents');
