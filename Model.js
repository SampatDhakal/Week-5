const mongoose = require('mongoose');

let activities = new mongoose.Schema ({
    activitiesName : String ,
    activitiesDescription : String 
})
let activitiesModel = mongoose.model('Activities', activities)

let facts = new mongoose.Schema({
    facts : String,
    activities : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Activities'
    }
})
let factsModel = mongoose.model('Facts',facts)
module.exports = {activitiesModel,factsModel}