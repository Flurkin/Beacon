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
	incidentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
	creationDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});



//create the model and add it to the exports
module.exports = Mongoose.model('Incident', incidentSchema, 'Incidents');
