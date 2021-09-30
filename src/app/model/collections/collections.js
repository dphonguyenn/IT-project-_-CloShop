// noi tao database
const mongoose = require('mongoose');
// lay database tu model
const Schema = mongoose.Schema;
// Create automatic slug
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const mongooseDelete = require('mongoose-delete');

const Collection = new Schema({
    name: { type: String, required: true },
    price: { type: Number},
    fit_type: { type: String },
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    img5: { type: String },
    length: { type: String },
    material: { type: String },
    occasion: { type: String },
    season: { type: String },
    size: { type: String },
    slug: { type: String,slug:'type'},
    type: { type: String },
    id_product: { type: String, slug: 'type', unique: true },
    color:{type:String}
}, {
    timestamps: true
});

module.exports = mongoose.model('collection', Collection);
// ?                         (_collection,_new_schema)