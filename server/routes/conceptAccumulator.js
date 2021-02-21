var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ConceptAccumulator = require('../models');
const Concept = require('../models/concept');
const accumulator = require('../models/accumulator');


//===================================================
//Obtener todos los conceptos acumuladores
//===================================================

app.get('/', function(req, res) {

    ConceptAccumulator.conceptAccumulator.findAll({
            include: accumulator.accumulator


        })
        .then(conceptAccumulator => {
            console.log(Concept);
            console.log(conceptAccumulator);
            res.status(200).json({
                ok: true,
                conceptAccumulator: conceptAccumulator
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando concepto acumuladores',
                errors: err
            });
        })
});


// ==========================================
// Obtener un acumulador por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ConceptAccumulator.conceptAccumulator.findByPk(id)
        .then(conceptAccumulator => {

            if (!conceptAccumulator) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el concepto acumulador con ' + id + 'no existe',
                    errors: { message: 'No existe concepto acumulador con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                conceptAccumulator: conceptAccumulator

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar concepto acumuladores',
                errors: err
            });
        })

});


//===================================================
//crear un nuevo concepto
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var conceptAccumulator = new ConceptAccumulator.conceptAccumulator({
        concept_id: body.concept_id,
        accumulator_id: body.accumulator_id,
    });

    conceptAccumulator.save(req.body)
        .then(conceptAccumulatorGuardado => {
            res.status(201).json({
                ok: true,
                conceptAccumulator: conceptAccumulatorGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un concepto acumulador',
                err
            });

        })


});


module.exports = app;