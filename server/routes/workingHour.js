var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const WorkingHour = require('../models');


//===================================================
//Obtener todos los tipos de horarios de trabajo
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    WorkingHour.workingHour.findAll()
        .then(workingHour => {

            res.status(200).json({
                ok: true,
                workingHour: workingHour
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de horarios de trabajo',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de horario de trabajo
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    WorkingHour.workingHour.findByPk(id)
        .then(workingHour => {

            if (!workingHour) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de horario con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de horario con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                workingHour: workingHour

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de horario',
                errors: err
            });
        })

});


module.exports = app;