/**
 * Created by spark on 7/12/2016.
 */

module.exports = function(mongoose){

    var GameSchema = mongoose.Schema({
        Name: String,
        Picture: {type: String, default: "images/KM_logo.png"},
        Description: String,
        Min_Num_of_Players: Number,
        Max_Num_of_Players: Number,
        Min_Playing_Time: Number,
        Max_Playing_Time: Number,
        Min_Age: Number,
        Max_Age: Number,
        Co_op: {type: Boolean, default: false},
        Strategy: {type: Boolean, default: false},
        Party: {type: Boolean, default: false},
        Classic: {type: Boolean, default: false},
        Worker_placement: {type: Boolean, default: false},
        Resource_management: {type: Boolean, default: false},
        Deck_building: {type: Boolean, default: false},
        Coolidge_Corner: {type: Boolean, default: false},
        Teele_Square: {type: Boolean, default: false},
        Players: [String]
        });

    return GameSchema;
};