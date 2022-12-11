const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {

    // const newUser = new User({
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     confirmPassword: req.body.confirmPassword
    //     //password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    // });
    let { firstname, lastname, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) return res.status(400).json({message: "Passwords do not match."});

    try {
        const existingCustomer = await User.findOne({email});
        if (existingCustomer) return res.status(400).json({message: "Email is already in use"})
        //

        const newUser = new User({
                firstname,
                lastname,
                username,
                email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
            });

        const savedUser = await newUser.save();

        //JWT
        const accessToken = jwt.sign({
            id: savedUser._id,
            isAdmin: savedUser.isAdmin
        }, process.env.JWT_SECRETKEY,
        {expiresIn: "3d"});

        const { password, ...others } = savedUser._doc;

        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }

};

const login = async(req, res) => {

    try {

        const user = await User.findOne({username: req.body.username});

        if (!user) return res.status(401).json("Username Not Found!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) return res.status(401).json("Incorrect Password!");

        //JWT
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRETKEY,
        {expiresIn: "3d"});

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});

    } catch (err) {
        res.status(500).json(err);
    }

};

module.exports = { register, login };