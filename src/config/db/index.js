// connect model voi database
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/collections_clothes');
        console.log("SUCESS");
    } catch (error) {
        console.log("FAIL");
    }
}

module.exports = { connect };