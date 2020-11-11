var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Gender = require('../models');


//===================================================
//Obtener todos los generos
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Gender.gender.findAll()
        .then(gender => {

            res.status(200).json({
                ok: true,
                gender: gender
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando generos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un genero
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Gender.gender.findByPk(id)
        .then(gender => {

            if (!gender) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el genero con ' + id + 'no existe',
                    errors: { message: 'No existe un genero con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                gender: gender

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un genero',
                errors: err
            });
        })

});


module.exports = app;