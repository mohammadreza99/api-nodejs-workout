const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const errorMiddleware = require('./http/middlewares/error.middleware');
const app = express();

class Application {
    constructor() {
        this.setupExpressServer();
        this.setupMongoose();
        this.setupRoutesAndMiddlewares();
        this.setupConfigs();
    }

    setupExpressServer() {
        const port = process.env.myPort || 3000;
        app.listen(port, (err) => {
            if (err) {
                console.log('express server error: ', err)
            } else {
                console.log(`Server listening to port ${port}!`)
            }
        })
    }

    setupMongoose() {
        mongoose.connect("mongodb://localhost:27017/restaurant_DB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((res) => {
            console.log("Database connected successfully!")
        }).catch((err) => {
            console.log('mongoose error: ', err);
        })
    }

    setupRoutesAndMiddlewares() {
        app.use(express.json()); // get data as json format.
        app.use(express.urlencoded({extended: true})); // get data as formData format.
        app.use(express.static("public")); //localhost:3000/test.png => read image from public folder.
        app.use(cors({origin: '*'})); // use middleware for all apis
        app.use("/api", apiRoutes); // use apiRoutes only for apis that have "/api
        app.use(errorMiddleware);
    }

    setupConfigs() {
        process.on("uncaughtException", (err) => {
            console.log(err)
        })

        process.on("unhandledRejection", (err) => {
            console.log(err)
        })

        app.set('view engine', 'pug');
        app.set('views', '../views'); // default
    }
}

module.exports = new Application();
