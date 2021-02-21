var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ConceptCategory = require('../models');
const Concept = require('../models');


//===================================================
//Obtener todos los grupos de conceptos
//===================================================

app.get('/', function(req, res) {

    ConceptCategory.conceptCategory.findAll({ include: Concept.concept })
        .then(conceptCategory => {

            res.status(200).json({
                ok: true,
                conceptCategory: conceptCategory
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando categoria de conceptos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un grupo de conceptos por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ConceptCategory.conceptCategory.findByPk(id)
        .then(conceptCategory => {

            if (!conceptCategory) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la categoria de conceptos con ' + id + 'no existe',
                    errors: { message: 'No existe la categoria de conceptos con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                conceptCategory: conceptCategory

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar una categoria de conceptos',
                errors: err
            });
        })

});


module.exports = app;