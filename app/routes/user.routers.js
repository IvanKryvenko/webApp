const { authJwt } = require('../middleware');
const controller = require('../api/user.controller');

module.exports = function(app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/test/all', controller.allAccess);

    app.get("/api/test/user", [authJwt.virifyToken], controller.userBoard);

    app.get(
        "/api/test/mod",
        [authJwt.virifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.virifyToken, authJwt.isAdmin],
        controller.andminBoard
    );
};