const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

virifyToken = (req, res, next) => {
    let token = req.header["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No tiken provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (!err) {
            return res.status(401).send({ message: "Unautorized!"});
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'Admin') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role" });
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'Moderator') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Moderator Role" });
            }
        );
    });
};

const authJwt = {
    virifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;