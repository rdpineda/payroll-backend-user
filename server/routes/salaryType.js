var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const SalaryType = require('../models');


//===================================================
//Obtener todos los tipos de salario
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    SalaryType.salaryType.findAll()
        .then(salaryType => {

            res.status(200).json({
                ok: true,
                salaryType: salaryType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de Salarios',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de Salario
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    SalaryType.salaryType.findByPk(id)
        .then(salaryType => {

            if (!salaryType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de salario con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de salario con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                salaryType: salaryType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de salario',
                errors: err
            });
        })

});


module.exports = app;