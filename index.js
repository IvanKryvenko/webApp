const express = require('express');
const bodyParser = require("body-parser");
const db = require("./app/models");
const cors = require('cors');
const dbConfig = require('./app/config/db.config');
const Role = db.role;

const app = express();
const port = 4000;

let corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the DB successfuly!');
        initial();
    })
    .catch(err => {
        console.log('Cannot to connect to the DB!');
        console.error(new Error(err));
        process.exit;
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

require('./app/routes/auth.routers')(app);
require('./app/routes/user.routers')(app);

app.listen(port, () => console.log("server running successful"));