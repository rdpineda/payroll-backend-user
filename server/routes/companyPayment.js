var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const CompanyPayment = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    CompanyPayment.companyPayment.findAll()
        .then(companyPayment => {

            res.status(200).json({
                ok: true,
                companyPayment: companyPayment
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Empresas datos de pago',
                errors: err
            });
        })
});

// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    CompanyPayment.companyPayment.findByPk(id)
        .then(companyPayment => {

            if (!companyPayment) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La Compania con el id ' + id + 'no existe',
                    errors: { message: 'No existe una compañia ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                companyPayment: companyPayment
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar compañia',
                errors: err
            });
        })

});



//===================================================
//actualizar una empresa
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    CompanyPayment.companyPayment.findByPk(id)
        .then(companyPayment => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */



            companyPayment.accountNumber = body.accountNumber
            companyPayment.createdAt = body.createdAt
            companyPayment.createUser = body.createUser
            companyPayment.updatedAt = body.updatedAt
            companyPayment.updateUser = body.updateUser
            companyPayment.isActive = body.isActive
            companyPayment.idTenant = body.idTenant
            companyPayment.idPaymentFrequency = body.idPaymentFrequency
            companyPayment.idPaymentMethod = body.idPaymentMethod
            companyPayment.idBank = body.idBank
            companyPayment.idAccountType = body.idAccountType


            companyPayment.save(req.body)
                .then(companyPaymentActualizado => {
                    res.status(201).json({
                        ok: true,
                        companyPayment: companyPaymentActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar la compañia',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'La compañia con el id ' + id + ' no existe',
                errors: { message: 'No existe una compañia con ese ID' }
            });

        })






});







//===================================================
//crear una nueva empresa TABLA COMPAÑIA FORMA DE PAGO
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var companyPayment = new CompanyPayment.companyPayment({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idTenant: body.idTenant,


    });

    companyPayment.save(req.body)
        .then(companypaymetGuardado => {
            res.status(201).json({
                ok: true,
                companyPayment: companypaymetGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear una empresa',
                err
            });

        })


});

//===================================================
//Eliminar una empresa
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    CompanyPayment.companyPayment.findByIdAndRemove(id, (err, companyPaymentEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar una empresa',
                errors: err
            });
        }

        if (!companyPaymentEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empresa con ese ID',
                errors: { message: 'No existe empresa con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            companyPayment: companyPaymentEliminado
        });


    });

});


module.exports = app;