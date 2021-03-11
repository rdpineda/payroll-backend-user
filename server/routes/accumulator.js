var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;
/* const db = require("../models");
const concept = db.concept;
const Accumulator = db.accumulator; */

var app = express();
const Accumulator = require('../models');
const Concept = require('../models');





//===================================================
//Obtener todos los acumuladores con concepto
//===================================================

app.get('/', function(req, res) {

    Accumulator.accumulator.findAll({
            include: Concept.concept
                /* include: [{
                    model: Concept.concept,
                    as: "conceptos",
                    attributes: ["id", "description"],
                }] */

        })
        .then(accumulator => {
            console.log(accumulator),
                res.status(200).json({
                    ok: true,
                    accumulator: accumulator
                });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando acumuladores',
                errors: err
            });
        })
});


// ==========================================
// Obtener un acumulador por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Accumulator.accumulator.findByPk(id)
        .then(accumulator => {

            if (!accumulator) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el acumulador con ' + id + 'no existe',
                    errors: { message: 'No existe acumulador con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                accumulator: accumulator

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar acumuladores',
                errors: err
            });
        })

});





module.exports = app;