module.exports = function(app, db, mongoose){
    var projectUserModel = require("./models/user.model.js")(db, mongoose);
    var projectGameModel = require("./models/game.model.js")(db, mongoose);

    require("./services/user.service.server.js")(app, projectUserModel);
    require("./services/game.service.server.js")(app, projectGameModel);
    require("./services/mail.service.server")(app);
};