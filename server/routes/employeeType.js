var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeType = require('../models');


//===================================================
//Obtener todos los tipos de empleados
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeType.employeeType.findAll()
        .then(employeeType => {

            res.status(200).json({
                ok: true,
                employeeType: employeeType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de empleados',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de empleado
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    EmployeeType.employeeType.findByPk(id)
        .then(employeeType => {

            if (!employeeType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de empleado con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de empleado con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employeeType: employeeType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de empleado',
                errors: err
            });
        })

});


module.exports = app;