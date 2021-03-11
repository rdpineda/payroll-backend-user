var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Company = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Company.company.findAll()
        .then(companies => {

            res.status(200).json({
                ok: true,
                companies: companies
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Empresas',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/company/:id', (req, res) => {
    var id = req.params.id;
    Company.company.findByPk(id)
        .then(company => {

            if (!company) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La Compania con el id ruben ' + id + 'no existe',
                    errors: { message: 'No existe una compañia ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                company: company

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empresa',
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

    Company.company.findByPk(id)
        .then(companies => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */

            companies.name = body.name;
            companies.demoDay = body.demoDay;
            companies.idTenant = body.idTenant;
            companies.idUser = body.idUser;

            companies.save(req.body)
                .then(companyGuardado => {
                    res.status(201).json({
                        ok: true,
                        companies: companyGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar una empresa',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'La empresa con el id ' + id + ' no existe',
                errors: { message: 'No existe una empresa con ese ID' }
            });

        })






});







//===================================================
//crear una nueva empresa
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var company = new Company.company({
        name: body.name,
        startDemoDay: body.startDemoDay,
        demoDay: body.demoDay,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idTenant: body.idTenant,
        idUser: body.idUser


    });

    company.save(req.body)
        .then(companyGuardado => {


            res.status(201).json({
                ok: true,
                company: companyGuardado,
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

    Company.company.findByIdAndRemove(id, (err, companyEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar una empresa',
                errors: err
            });
        }

        if (!companyEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empresa con ese ID',
                errors: { message: 'No existe empresa con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            company: companyEliminado
        });


    });

});

// ==========================================
// Obtener una compañia por Usuario
// ==========================================

app.get('/:iduser', (req, res) => {
    var iduser = req.params.iduser;
    Company.company.findAll({ where: { idUser: iduser } })
        .then(company => {

            if (!company) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario ' + id + 'no tiene compañia',
                    errors: { message: 'No existe una compañia para ese usuario' }
                });
            }
            res.status(200).json({
                ok: true,
                company: company
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


module.exports = app;