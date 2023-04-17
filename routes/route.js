const express = require('express');
const router = express.Router();

const User = require('../models/userdb');

//Retriving
router.get('/User', async (req, res, next) => {
    const result = await User.find();
    console.log('Result', result);
    if (result.err) {
        res.json(result.err);
    }
    else {
        res.json(result);
    }

});

//Login Api
router.post('/UserLogin', async (req, res, next) => {
    console.log(req.body);
    const result = await User.find({name:req.body.name});//get user by name
    console.log('Result', result);

    if (result.err) {
        res.json(result.err);
    }
    else if(result.length>0 && result[0].password===req.body.password) {//check if there is any user returned by db & match password
        res.json({msg:'Logged in Successful', loginSuccess: true});//if password correct send user data as response
    } else {
        res.json({msg:'login failed', loginSuccess: false});//if wrong password send err msg 
    }

});

// Add
router.post("/User", async (req, res, next) => {
    console.log(req.body);

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const result = await newUser.save();
    if (result.err) {
        res.json({ msg: "Fail" });
    } else {
        res.json({ msg: "Added" });
    }
});

//Delete
router.delete('/User/:id', async (req, res, next) => {
    const result = await User.deleteOne({ _id: req.params.id })
    if (result.err) {
        res.json(result.err);
    }
    else {
        res.json(result);
    }
});
module.exports = router;