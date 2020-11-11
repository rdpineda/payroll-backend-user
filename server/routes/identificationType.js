var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const IdentificationType = require('../models');


//===================================================
//Obtener todos los tipos de documentos
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    IdentificationType.identificationType.findAll()
        .then(identificationType => {

            res.status(200).json({
                ok: true,
                identificationType: identificationType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de documentos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de documento
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    IdentificationType.identificationType.findByPk(id)
        .then(identificationType => {

            if (!identificationType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de documento con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de documento con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                identificationType: identificationType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de documento',
                errors: err
            });
        })

});


module.exports = app;