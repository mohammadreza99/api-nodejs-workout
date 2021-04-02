const model = require("../../models/restaurant.model");
const mongoose = require("mongoose");
const {restaurantInsertValidator} = require("../validators/restaurant.validator")

class RestaurantController {
    async get(req, res) {
        const result = await model.find().select("name description score pic address").limit(20);
        res.send(result)
    }

    async getById(req, res) {
        const id = req.params.id;
        if (mongoose.isValidObjectId(id)) {
            const result = await model.findById(id).select("-adminPassword");
            if (!result) {
                return res.status(404).send("یافت نشد.");
            }
            res.send(result);
        } else {
            res.status(400).send("موارد درخواست خود را مجددا بررسی کنید.")
        }
    }

    async post(req, res) {
        const {error} = restaurantInsertValidator(req.body);
        if (error) {
            return res.send(error.message)
        }
        let result = new model({
            ...req.body
        });
        result = await result.save();
        res.send(result);
    }

    async put(req, res) {
        console.log(req.params.id)
        let result = model.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }, {new: true});
        res.send(result);
    }

    async delete(req, res) {
        const result = model.findByIdAndDelete(req.params.id);
        await result.save();
        res.send('deleted!');
    }
}

module.exports = new RestaurantController();
