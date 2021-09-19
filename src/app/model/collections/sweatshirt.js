// noi tao database
const mongoose = require('mongoose');
// lay database tu model
const Schema = mongoose.Schema;
const SweatShirt = new Schema({
    name: { type: String, required: true },
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
    slug: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('sweatshirt', SweatShirt);
// ?                         (_collection,_new_schema)