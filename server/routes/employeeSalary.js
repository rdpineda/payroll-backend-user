var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeSalary = require('../models');


//===================================================
//Obtener todos los historico de salario del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeSalary.employeeSalary.findAll()
        .then(employeeSalary => {

            res.status(200).json({
                ok: true,
                employeeSalary: employeeSalary
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los historico de salario de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un historico salarial por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    EmployeeSalary.employeeSalary.findByPk(id)
        .then(employeeSalary => {

            if (!employeeSalary) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employeeSalary: employeeSalary
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empleado',
                errors: err
            });
        })

});



//===================================================
//actualizar un historico salarial del empleado
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    EmployeeSalary.employeeSalary.findByPk(id)
        .then(employeeSalary => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */



            employeeSalary.initialSalaryDate = body.initialSalaryDate
            employeeSalary.endSalaryDate = body.endSalaryDate
            employeeSalary.salary = body.salary
            employeeSalary.createdAt = body.createdAt
            employeeSalary.createUser = body.createUser
            employeeSalary.updatedAt = body.updatedAt
            employeeSalary.updateUser = body.updateUser
            employeeSalary.isActive = body.isActive
            employeeSalary.idSalaryType = body.idSalaryType
            employeeSalary.idEmployee = body.idEmployee



            employeeSalary.save(req.body)
                .then(employeeSalaryActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeeSalary: employeeSalaryActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar salario del empleado',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El empleado con el id ' + id + ' no existe',
                errors: { message: 'No existe el empleado con ese ID' }
            });

        })






});







//===================================================
//crear un historico de salario del empleado
//===================================================

app.post('/', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {
    var body = req.body;

    var employeeSalary = new EmployeeSalary.employeeSalary({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idSalaryType: body.idSalaryType,
        idEmployee: body.idEmployee,
        initialSalaryDate: body.initialSalaryDate,
        endSalaryDate: body.endSalaryDate,
        salary: body.salary


    });

    employeeSalary.save(req.body)
        .then(employeeSalaryGuardado => {
            res.status(201).json({
                ok: true,
                employeeSalary: employeeSalaryGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un historico salarial del empleado',
                err
            });

        })


});

//===================================================
//Eliminar un historico de salario del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeeSalary.employeeSalary.findByIdAndRemove(id, (err, employeeSalaryEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un historico salarial del empleado',
                errors: err
            });
        }

        if (!employeeSalaryEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeeSalary: employeeSalaryEliminado
        });


    });

});


module.exports = app;