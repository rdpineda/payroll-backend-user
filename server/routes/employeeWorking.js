var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeWorking = require('../models');


//===================================================
//Obtener todas informacion laboral del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeWorking.employeeWorking.findAll()
        .then(employeeWorking => {

            res.status(200).json({
                ok: true,
                employeeWorking: employeeWorking
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando informacion laboral de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un empleado laboral por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    EmployeeWorking.employeeWorking.findByPk(id)
        .then(employeeWorking => {

            /* if (!employeeWorking) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' },

                });
            } */
            res.status(200).json({
                ok: true,
                employeeWorking: employeeWorking
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
//actualizar informacion laboral del empleado
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    EmployeeWorking.employeeWorking.findByPk(id)
        .then(employeeWorking => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */



            employeeWorking.transportAssistence = body.transportAssistence
            employeeWorking.variableSalary = body.variableSalary
            employeeWorking.createdAt = body.createdAt
            employeeWorking.createUser = body.createUser
            employeeWorking.updatedAt = body.updatedAt
            employeeWorking.updateUser = body.updateUser
            employeeWorking.isActive = body.isActive
            employeeWorking.idContractRegime = body.idContractRegime
            employeeWorking.idEmployeeType = body.idEmployeeType
            employeeWorking.idWorkPlaceRisks = body.idWorkPlaceRisks
            employeeWorking.idWorkingHour = body.idWorkingHour


            employeeWorking.save(req.body)
                .then(employeeWorkingActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeeWorking: employeeWorkingActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar informacion laboral del empleado',
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
//crear informacion laboral del empleado
//===================================================

app.post('/', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {
    var body = req.body;

    var employeeWorking = new EmployeeWorking.employeeWorking({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idContractRegime: body.idContractRegime,
        idEmployeeType: body.idEmployeeType,
        idWorkPlaceRisks: body.idWorkPlaceRisks,
        idWorkingHour: body.idWorkingHour,
        transportAssistence: body.transportAssistence,
        variableSalary: body.variableSalary


    });

    employeeWorking.save(req.body)
        .then(employeeWorkingGuardado => {
            res.status(201).json({
                ok: true,
                employeeWorking: employeeWorkingGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear informacion laboral del empleado',
                err
            });

        })


});

//===================================================
//Eliminar informacion laboral del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeeWorking.employeeWorking.findByIdAndRemove(id, (err, employeeWorkingEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar informacion laboral del empleado',
                errors: err
            });
        }

        if (!employeeWorkingEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeeWorking: employeeWorkingEliminado
        });


    });

});


module.exports = app;