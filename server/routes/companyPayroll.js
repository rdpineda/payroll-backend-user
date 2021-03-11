var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const CompanyPayroll = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    CompanyPayroll.companyPayroll.findAll()
        .then(companyPayroll => {

            res.status(200).json({
                ok: true,
                companyPayroll: companyPayroll
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando datos de nomina',
                errors: err
            });
        })
});

// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    CompanyPayroll.companyPayroll.findByPk(id)
        .then(companyPayroll => {

            if (!companyPayroll) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La Compania con el id ' + id + 'no existe',
                    errors: { message: 'No existe una compañia ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                companyPayroll: companyPayroll
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

    CompanyPayroll.companyPayroll.findByPk(id)
        .then(companyPayroll => {



            companyPayroll.createdAt = body.createdAt
            companyPayroll.createUser = body.createUser
            companyPayroll.updatedAt = body.updatedAt
            companyPayroll.updateUser = body.updateUser
            companyPayroll.isActive = body.isActive
            companyPayroll.idTenant = body.idTenant


            companyPayroll.save(req.body)
                .then(companyPayrollActualizado => {
                    res.status(201).json({
                        ok: true,
                        companyPayroll: companyPayrollActualizado,
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
//crear una nueva empresa TABLA COMPAÑIA NOMINA
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var companyPayroll = new CompanyPayroll.companyPayroll({


        id: body.id,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idTenant: body.idTenant,


    });

    companyPayroll.save(req.body)
        .then(companyPayrollGuardado => {
            res.status(201).json({
                ok: true,
                companyPayroll: companyPayrollGuardado,
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

    CompanyPayroll.companyPayroll.findByIdAndRemove(id, (err, companyPayrollEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar una empresa',
                errors: err
            });
        }

        if (!companyPayrollEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empresa con ese ID',
                errors: { message: 'No existe empresa con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            companyPayroll: companyPayrollEliminado
        });


    });

});


module.exports = app;