var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const City = require('../models');


//===================================================
//Obtener todos los municipios
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    City.city.findAll()
        .then(city => {

            res.status(200).json({
                ok: true,
                city: city
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando municipios',
                errors: err
            });
        })
});


// ==========================================
// Obtener un municipio por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    City.city.findByPk(id)
        .then(city => {

            if (!city) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el municipio con ' + id + 'no existe',
                    errors: { message: 'No existe un municipio con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                city: city

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un municipio',
                errors: err
            });
        })

});

// ==========================================
// Obtener un municipio por ID de departamento
// ==========================================


app.get('/departamento/:id', (req, res) => {
    var id = req.params.id;
    City.city.findAll({ where: { idState: id }, raw: true })
        .then(city => {

            if (!city) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el municipio con ' + id + 'no existe',
                    errors: { message: 'No existe un municipio para ese departamento' }
                });
            }
            res.status(200).json({
                ok: true,
                city: city

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un municipio',
                errors: err
            });
        })

});


module.exports = app;