const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Bill = new Schema({
    fullname: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    products: { type: Array },
    quantity: { type: Array },
    totalPrice: { type: Number },
    payment: { type: String },
    note: { type: String },
    city: { type: String },
    district: { type: String },
    ward: { type:String},
    isChecked: { type: Boolean, default: false },
    id: { type: String, unique: true },
    id_user:{ type: String}
}, {
    timestamps: true
});

// add plugins for soft delete
mongoose.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});

module.exports = mongoose.model('bill', Bill);
