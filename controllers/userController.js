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
                return res.redirect('/users/login');
            }, err => {
                if (err) { return res.status(500).json({ message: 'Error in register new user', error: err }) };
            });
        } else {
            res.render('newUser', { error: 'Email already use by another user!' });
        }
    },

    login: async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userModel.find({ email: email, password: password });
        if (user.length > 0) {
            res.cookie('login', email);
            return res.redirect('/');
        } else {
            res.render('login', { message: 'Email or password wrong!' });
        }
    },
};