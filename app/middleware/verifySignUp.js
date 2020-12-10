const db = require('../models');
const Roles = db.ROLES;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "User with this username alredy exist" });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
    
            if(email) {
                res.status(400).send({ message: "User with this email already exist!" });
                return;
            }
    
            next();
        });
    });
};

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.incudes(req.body.roles[i])) {
                res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
                return;
            };
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUserNameOrEmail,
    checkRoleExisted
}

module.exports = verifySignUp;