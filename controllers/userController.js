var userModel = require('../models/user');
var jwt = require('jsonwebtoken');

module.exports = {
    save: async function (req, res) {
        let userEmail = await userModel.find({ email: req.body.email });
        if (!userEmail.length > 0) {
            let user = new userModel({
                email: req.body.email,
                password: req.body.password
            });
            user.save().then(result => {
                return res.json({ suces: true, result: result });
            }, err => {
                return res.status(500).json({ error: 'Inserir senha ou email' });
            });
        } else
            return res.status(500).json({ error: 'Email já usado' });

    },

    login: async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let user = await userModel.find({ email: email, password: password });
        if (user.length > 0) {
            const token = jwt.sign({ email }, 'corinthians');
            return res.json({ token });
        }
        return res.status(500).json({ error: 'Falha no login' });
    },
};