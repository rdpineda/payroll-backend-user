var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ConceptType = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    ConceptType.conceptType.findAll()
        .then(conceptType => {

            res.status(200).json({
                ok: true,
                conceptType: conceptType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de conceptos',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ConceptType.conceptType.findByPk(id)
        .then(conceptType => {

            if (!conceptType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de concepto con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de concepto con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                conceptType: conceptType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de concepto',
                errors: err
            });
        })

});


module.exports = app;