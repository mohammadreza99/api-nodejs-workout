const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {type: String, required: true},
    text: {type: String, required: true},
    score: Number,
});

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    score: Number,
    price: {type: Number, required: true},
    pic: String,
    comments: [commentSchema],
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    address: String,
    pic: String,
    comment: [commentSchema],
    menu: [foodSchema],
    adminUsername: {type: String},
    adminPassword: {type: String}
});
restaurantSchema.pre("insertMany", function (next) {
    console.log(this._id)
})
restaurantSchema.post("deleteOne", function (next) {
    console.log(this._id)
})
const model = mongoose.model('restaurant', restaurantSchema);

module.exports = model;

























