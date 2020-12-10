exports.allAccess = (req, res) => {
    res.status(200).rend("Public Content");
};

exports.userBoard = (req, res) => {
    res.status(200).rend("User Content");
};

exports.andminBoard = (req, res) => {
    res.status(200).rend("Andmin Content");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).rend("Moderator Content");
};