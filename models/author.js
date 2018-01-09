var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function (){
//	if('Invalid date' !=  moment.duration(this.date_of_death - this.date_of_birth).humanize())
	if(this.date_of_death != null)
		return moment.duration(this.date_of_death - this.date_of_birth).humanize();
	else if(this.date_of_birth == null)
		return 'Unkown';
	else
		return moment.duration(moment() - this.date_of_birth).humanize();
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);