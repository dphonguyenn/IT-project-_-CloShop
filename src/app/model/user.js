const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String , default: 'customer' },
    phone: { type: String },
    fullname: { type: String },
    boss: { type: Boolean, default: false },
    //birth: { type: Date },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', User);
