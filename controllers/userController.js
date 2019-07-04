var userModel = require('../models/user');

module.exports = {
    save: async function (req, res) {

        let userEmail = await userModel.find({ email: req.body.email });
        if (!userEmail.length > 0) {
            let user = new userModel({
                email: req.body.email,
                password: req.body.password
            });
            user.save().then(result => {
                return res.status(200);
            }, err => {
                return res.status(500).json({ message: 'Error in register new user', error: err });
            });
        } else {
            return res.status(500);
        }
    },

    login: async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userModel.find({ email: email, password: password });
        if (user.length > 0) {
            res.cookie('login', email);
            return res.status(200);
        } else {
            res.status(500).json({ sucess: false, message: 'Email or password wrong!' });
        }
    },
};