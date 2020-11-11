var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeeSocialSecurity = require('../models');


//===================================================
//Obtener todos los contratos laborales del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeeSocialSecurity.employeeSocialSecurity.findAll()
        .then(employeeSocialSecurity => {

            res.status(200).json({
                ok: true,
                employeeSocialSecurity: employeeSocialSecurity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando informacion de seguridad social de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un contrato laboral por ID
// ==========================================

app.get('/:idEmployee', (req, res) => {
    var idEmployee = req.params.idEmployee;
    // EmployeeSocialSecurity.employeeSocialSecurity.findByPk(id)
    EmployeeSocialSecurity.employeeSocialSecurity.findAll({ where: { idEmployee: idEmployee } })
        .then(employeeSocialSecurity => {

            if (!employeeSocialSecurity) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' },
                    employeeSocialSecurity: employeeSocialSecurity
                });
            }
            res.status(200).json({
                ok: true,
                employeeSocialSecurity: employeeSocialSecurity
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

    EmployeeSocialSecurity.employeeSocialSecurity.findByPk(id)
        .then(employeeJob => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */




            employeeSocialSecurity.createdAt = body.createdAt
            employeeSocialSecurity.createUser = body.createUser
            employeeSocialSecurity.updatedAt = body.updatedAt
            employeeSocialSecurity.updateUser = body.updateUser
            employeeSocialSecurity.isActive = body.isActive
            employeeSocialSecurity.idEmployee = body.idEmployee
            employeeSocialSecurity.idContributorType = body.idContributorType
            employeeSocialSecurity.idContributorSubType = body.idContributorSubType
            employeeSocialSecurity.idEntityHealth = body.idEntityHealth
            employeeSocialSecurity.idEntityPension = body.idEntityPension
            employeeSocialSecurity.idEntitySeverance = body.idEntitySeverance



            employeeSocialSecurity.save(req.body)
                .then(employeeSocialSecurityActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeeSocialSecurity: employeeSocialSecurityActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar informacion de seguridad social del empleado',
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

    var employeeSocialSecurity = new EmployeeSocialSecurity.employeeSocialSecurity({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idEmployee: body.idEmployee,
        idContributorType: body.idContributorType,
        idContributorSubType: body.idContributorSubType,
        idEntityHealth: body.idEntityHealth,
        idEntityPension: body.idEntityPension,
        idEntitySeverance: body.idEntitySeverance



    });

    employeeSocialSecurity.save(req.body)
        .then(employeeSocialSecurityGuardado => {
            res.status(201).json({
                ok: true,
                employeeSocialSecurity: employeeSocialSecurityGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear informacion de seguridad social del empleado',
                err
            });

        })


});

//===================================================
//Eliminar un contrato laboral del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeeSocialSecurity.employeeSocialSecurity.findByIdAndRemove(id, (err, employeeSocialSecurityEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar informacion de seguridad social del empleado',
                errors: err
            });
        }

        if (!employeeSocialSecurityEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeeSocialSecurity: employeeSocialSecurityEliminado
        });


    });

});


module.exports = app;