const joi = require("joi");
const restaurantInsertValidator = (data) => {
    const joiObject = joi.object({
        name: joi.string().required().min(2),
        description: joi.string().required().min(2),
    });
    return joiObject.validate(data)
}


module.exports = {restaurantInsertValidator}
