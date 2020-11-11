var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const WorkPlaceRisks = require('../models');


//===================================================
//Obtener todos los tipos de riesgo
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    WorkPlaceRisks.workPlaceRisks.findAll()
        .then(workPlaceRisks => {

            res.status(200).json({
                ok: true,
                workPlaceRisks: workPlaceRisks
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de riesgo',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de riesgo
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    WorkPlaceRisks.workPlaceRisks.findByPk(id)
        .then(workPlaceRisks => {

            if (!workPlaceRisks) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de riesgo con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de riesgo con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                workPlaceRisks: workPlaceRisks
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de riesgo',
                errors: err
            });
        })

});


module.exports = app;