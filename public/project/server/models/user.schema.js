/**
 * Created by spark on 6/14/2016.
 */
/**
 * Created by spark on 7/12/2016.
 */

module.exports = function(mongoose){

    var UserGameSchema = mongoose.Schema({
        name: String,
        dateLastPlayed: {type: Date, default: Date.now},
        timesPlayed: Number
    });

    var UserSchema = mongoose.Schema({
        email: String,
        username: String,
        password: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        games: [UserGameSchema],
        roles: {type: [String], default: ["player"]}
    });

    return UserSchema;
};