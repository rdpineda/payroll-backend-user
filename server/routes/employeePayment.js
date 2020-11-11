var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const EmployeePayment = require('../models');


//===================================================
//Obtener todos los historico de salario del empleado
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    EmployeePayment.employeePayment.findAll()
        .then(employeePayment => {

            res.status(200).json({
                ok: true,
                employeePayment: employeePayment
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los datos de pago de los empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un historico salarial por ID
// ==========================================

app.get('/:idEmployee', (req, res) => {
    var idEmployee = req.params.idEmployee;
    /* EmployeePayment.employeePayment.findByPk(id) */
    EmployeePayment.employeePayment.findAll({ where: { idEmployee: idEmployee } })
        .then(employeePayment => {

            if (!employeePayment) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe el empleado ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employeePayment: employeePayment
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

    EmployeePayment.employeePayment.findByPk(id)
        .then(employeePayment => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */




            employeePayment.accountNumber = body.accountNumber
            employeePayment.createdAt = body.createdAt
            employeePayment.createUser = body.createUser
            employeePayment.updatedAt = body.updatedAt
            employeePayment.updateUser = body.updateUser
            employeePayment.isActive = body.isActive
            employeePayment.idbank = body.idbank
            employeePayment.idAccountType = body.idAccountType
            employeePayment.idEmployee = body.idEmployee



            employeePayment.save(req.body)
                .then(employeePaymentActualizado => {
                    res.status(201).json({
                        ok: true,
                        employeePayment: employeePaymentActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar datos de pago del empleado',
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

    var employeePayment = new EmployeePayment.employeePayment({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idBank: body.idBank,
        idAccountType: body.idAccountType,
        idEmployee: body.idEmployee,
        accountNumber: body.accountNumber


    });

    employeePayment.save(req.body)
        .then(employeePaymentGuardado => {
            res.status(201).json({
                ok: true,
                employeePayment: employeePaymentGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear datos de pago del empleado',
                err
            });

        })


});

//===================================================
//Eliminar un historico de salario del empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    EmployeePayment.employeePayment.findByIdAndRemove(id, (err, employeePaymentEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar datos de pago del empleado',
                errors: err
            });
        }

        if (!employeePaymentEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employeePayment: employeePaymentEliminado
        });


    });

});


module.exports = app;