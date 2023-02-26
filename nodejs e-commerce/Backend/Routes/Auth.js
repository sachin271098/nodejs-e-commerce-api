const authRoute = require('express').Router();
const User = require('../Models/User');
const Cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
authRoute.post('/register', async (req, res) => {


    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC), // hashing password
        phone: req.body.phone,
    });



    try {
        const saveUser = await newUser.save();
        res.send(saveUser);
    }
    catch (err) {
        console.log('user not register', err);
    }
})


// login 
authRoute.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && req.statusCode(401).json('worng credentials !');

        const hasdedPassword = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC); // decrypt password

        const orignalpassword = hasdedPassword.toString(Cryptojs.enc.Utf8);
        orignalpassword !== req.body.password && res.status(401).json("wrong credentials !");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        const { password, ...other } = user._doc;
        res.status(200).send({ ...other, accessToken });

    }
    catch (err) {

    }
})

module.exports = authRoute;