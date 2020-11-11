var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ConceptGroup = require('../models');


//===================================================
//Obtener todos los grupos de conceptos
//===================================================

app.get('/', function(req, res) {

    ConceptGroup.conceptGroup.findAll()
        .then(conceptGroup => {

            res.status(200).json({
                ok: true,
                conceptGroup: conceptGroup
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando grupos de conceptos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un grupo de conceptos por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ConceptGroup.conceptGroup.findByPk(id)
        .then(conceptGroup => {

            if (!conceptGroup) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el grupo de conceptos con ' + id + 'no existe',
                    errors: { message: 'No existe el grupo de conceptos con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                conceptGroup: conceptGroup

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un grupo de conceptos',
                errors: err
            });
        })

});


module.exports = app;