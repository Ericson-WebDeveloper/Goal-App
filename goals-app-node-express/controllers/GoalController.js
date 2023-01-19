const asyncHanlder = require('express-async-handler');
const Goal = require('../model/Goals.js');

const getGoals = asyncHanlder(async(req, res) => {
    const goals = await Goal.find({user: req.user.id});
    return res.json({'data': goals}).status(200);
})

const postGoals = asyncHanlder(async(req, res) => {
    const {text} = req.body;
    if(!text) {
        res.status(400);
        throw new Error('Text is required');
    }

    const response = await Goal.create({
        text: text,
        user: req.user.id
    });
    if(response) {
        return res.json({'message': 'Goal created', data: response}).status(200);
    } else {
        res.status(400);
        throw new Error('Goal Creating Failed');
    }
});

const deleteGoals = asyncHanlder(async(req, res) => {
    try {
        const response = await Goal.deleteOne({_id:req.params.id, user: req.user.id});
        if(response) {
            return res.json({'message': 'Goal Deleted Complete'}).status(200);
        } else {
            res.status(400);
            throw new Error('Goal Deleting Failed');
        }
    } catch (error) {
        res.status(500);
            throw new Error('Something wrong please try again later');
    }
    
});

const updateGoals = asyncHanlder(async(req, res) => {

    const goal = await Goal.findOne({_id:req.params.id, user: req.user.id});

    const {text} = req.body;

    if(!text) {
        res.status(400);
        throw new Error('Text is required');
    }

    if(!goal) {
        res.status(400);
        throw new Error('Goal Not Found');
    }
    const response = await Goal.updateOne({_id: req.params.id}, {
        text
    });

    if(response) {
        return res.json({'message': 'Goal Updated Complete'}).status(200);
    } else {
        res.status(400);
        throw new Error('Goal Deleting Failed');
    }
});


module.exports = {
    getGoals,
    postGoals,
    deleteGoals,
    updateGoals
}