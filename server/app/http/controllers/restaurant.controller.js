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
        let result = await model.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }, {new: true});

        res.send(result);
    }

    async delete(req, res) {
        const result = await model.findByIdAndRemove(req.params.id);
        res.send(result);
    }
}

/*
src -
      application -
                    user
                    rest
                    index.js
      infrastructure -
                       database -
                                  model
                                  repositories
                       logging
                              index.js
                              logger_1Service.js
                              logger_2Service.js
      domain -
            validations
      interface -
               utils
               middleware
                         errorHandler
               modules
                     user
                        public
                           post.js
                           patch.js
                           routes.js
                           serializer.js
public
config
 */
module.exports = new RestaurantController();
