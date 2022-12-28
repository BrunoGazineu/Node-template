const HomeModel = require('../models/HomeModel');

exports.paginaInicial = (req, res) => {
    console.log(req.session.usuario)
    res.render('index');
}

exports.formPost = (req, res) => {
    res.send('Post');
}