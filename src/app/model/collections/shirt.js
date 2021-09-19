// noi tao database
const mongoose = require('mongoose');
// tu tao field [slug]
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
// tao ra collection chua co trong database
const Schema = mongoose.Schema;
const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoID: { type:String, required:true },
}, {
    timestamps: true
});

module.exports = mongoose.model('course', Course);
// ?                         (_collection,_new_schema)
