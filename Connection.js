const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://0.0.0.0:27017/activitiesDB', ()=> 
    console.log('connected to DB!')
);
module.export = {connection};