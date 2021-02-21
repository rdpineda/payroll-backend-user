var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeContract = require('../models');


//===================================================
//Obtener todos los contratos laborales del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeContract.employeeContract.findAll()
        .then(employeeContract => {

            res.status(200).json({
                ok: true,
                employeeContract: employeeContract
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los contratos laborales de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un contrato laboral por ID
// ==========================================

app.get('/:idEmployee', (req, res) => {
    // var id = req.params.id;
    var idEmployee = req.params.idEmployee;
    // EmployeeContract.employeeContract.findByPk(id)
    EmployeeContract.employeeContract.findAll({ where: { idEmployee: idEmployee } })
        .then(employeeContract => {

            if (!employeeContract) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employeeContract: employeeContract
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

    EmployeeContract.employeeContract.findByPk(id)
        .then(employeeContract => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */



            employeeContract.initialContractDate = body.initialContractDate
            employeeContract.endContractDate = body.endContractDate
            employeeContract.createdAt = body.createdAt
            employeeContract.createUser = body.createUser
            employeeContract.updatedAt = body.updatedAt
            employeeContract.updateUser = body.updateUser
            employeeContract.isActive = body.isActive
            employeeContract.idContractType = body.idContractType
            employeeContract.idEmployee = body.idEmployee



            employeeContract.save(req.body)
                .then(employeeContractActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeeContract: employeeContractActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar contrato del empleado',
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

    var employeeContract = new EmployeeContract.employeeContract({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idContractType: body.idContractType,
        idEmployee: body.idEmployee,
        initialContractDate: body.initialContractDate,
        endContractDate: body.endContractDate


    });

    employeeContract.save(req.body)
        .then(employeeContractGuardado => {
            res.status(201).json({
                ok: true,
                employeeContract: employeeContractGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear contrato laboral del empleado',
                err
            });

        })


});

//===================================================
//Eliminar un contrato laboral del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeeContract.employeeContract.findByIdAndRemove(id, (err, employeeContractEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un contrato laboral del empleado',
                errors: err
            });
        }

        if (!employeeContractEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeeContract: employeeContractEliminado
        });


    });

});


module.exports = app;