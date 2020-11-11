var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Country = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Country.country.findAll()
        .then(country => {

            res.status(200).json({
                ok: true,
                country: country
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Paises',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Country.country.findByPk(id)
        .then(country => {

            if (!country) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el pais con ' + id + 'no existe',
                    errors: { message: 'No existe un pais con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                country: country

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un pais',
                errors: err
            });
        })

});


module.exports = app;