var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeJob = require('../models');


//===================================================
//Obtener todos los contratos laborales del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeJob.employeeJob.findAll()
        .then(employeeJob => {

            res.status(200).json({
                ok: true,
                employeeJob: employeeJob
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando informacion del puesto de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un contrato laboral por ID
// ==========================================

app.get('/:idEmployee', (req, res) => {
    var idEmployee = req.params.idEmployee;
    // EmployeeJob.employeeJob.findByPk(idEmployee)
    EmployeeJob.employeeJob.findAll({ where: { idEmployee: idEmployee } })
        .then(employeeJob => {

            if (!employeeJob) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + idEmployee + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employeeJob: employeeJob
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
//actualizar un contrato laboral del empleado
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    EmployeeJob.employeeJob.findByPk(id)
        .then(employeeJob => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */




            employeeJob.createdAt = body.createdAt;
            employeeJob.createUser = body.createUser;
            employeeJob.updatedAt = body.updatedAt;
            employeeJob.updateUser = body.updateUser;
            employeeJob.isActive = body.isActive;
            employeeJob.idEmployee = body.idEmployee;
            employeeJob.idCostCenter = body.idCostCenter;
            employeeJob.idArea = body.idArea;
            employeeJob.idSubsidiary = body.idSubsidiary;
            employeeJob.idPosition = body.idPosition;



            employeeJob.save(req.body)
                .then(employeeJobActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeeJob: employeeJobActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar informacion del puesto del empleado',
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
//crear un contrato laboral del empleado
//===================================================

app.post('/', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {
    var body = req.body;

    var employeeJob = new EmployeeJob.employeeJob({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idEmployee: body.idEmployee,
        idCostCenter: body.idCostCenter,
        idArea: body.idArea,
        idSubsidiary: body.idSubsidiary,
        idPosition: body.idPosition



    });

    employeeJob.save(req.body)
        .then(employeeJobGuardado => {
            res.status(201).json({
                ok: true,
                employeeJob: employeeJobGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear informacion del puesto del empleado',
                err
            });

        })


});

//===================================================
//Eliminar un contrato laboral del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeeJob.employeeJob.findByIdAndRemove(id, (err, employeeJobEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar informacion del puesto del empleado',
                errors: err
            });
        }

        if (!employeeJobEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeeJob: employeeJobEliminado
        });


    });

});


module.exports = app;