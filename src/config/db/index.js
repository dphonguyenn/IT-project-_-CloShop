// connect model with database
const mongoose = require('mongoose');
async function connect() {
    try {
        // await mongoose.connect('mongodb+srv://duyphong-admin:duyphong123456@cluster0.ph4pq.mongodb.net/clothes_itproject', {
        await mongoose.connect('mongodb://localhost:27017/collections_clothes', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log("Access Database Success!");
    } catch (error) {
        console.log("Access FAIL!");
    }
}
module.exports = { connect }