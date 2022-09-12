const express = require("express");
const app = express();
var bodyparser = require('body-parser')
const mongoose = require('mongoose')
const { connection } = require('./Connection.js')
const { activitiesModel, factsModel } = require('./Model.js');
const activities = express.Router();
const facts = express.Router({ mergeParams: true });



app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


activities.post('/', (req, res) => {
    let activities = new activitiesModel(req.body);
    activities.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})


activities.get('/', (req, res) => {
    activitiesModel.find({}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

facts.post('/', (req, res) => {
    let facts = new factsModel({
        facts: req.body.facts,
        activities: req.params.activityid
    })
    facts.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})

facts.get('/', (req, res) => {
    factsModel.find({ _id: req.params.activityid })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
})

// activities.delete('/:activityid', async (req, res) => {
//     factsModel.deleteMany({ activities: req.params.activityid })
//     activitiesModel.deleteOne({ activityid: req.params.activityid })
//         .then((data) => {
//             res.send(data)
//         }).catch((err) => {
//             res.send(err)
//         })
// })

facts.delete('/:factid', async (req, res) => {
    factsModel.deleteOne({ _id: req.params.factid })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
})

facts.put('/:factid', async (req, res) => {
    try{
        const updatedfact = await factsModel.updateOne(
            {_id: req.params.factid},
            {$set: { facts: req.body.facts}}
        );
        res.json(updatedfact);
    } catch (err) {
        res.json({ message: err});
    }
});


activities.delete('/:activityid', async (req, res) => {
    try{
        const removeFact = await factsModel.deleteOne({activities: req.params.activityid});
        const removeActivities = await activitiesModel.deleteMany( {_id: req.params.activityid});
        res.json(removeActivities);
    } catch (err) {
        res.json({ message: err});
    }
})


app.use('/activities', activities);
app.use('/activities/:activityid/facts', facts);
app.listen(3000);

