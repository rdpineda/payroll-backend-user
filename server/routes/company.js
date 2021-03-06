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
        .then(company => {

            res.status(200).json({
                ok: true,
                company: company
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

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Company.company.findByPk(id)
        .then(company => {

            if (!company) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La Compania con el id ' + id + 'no existe',
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

    Company.company.findByPk(id)
        .then(company => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */

            company.identification = body.identification;
            company.verificationNumber = body.verificationNumber;
            company.name = body.name;
            company.address = body.address;
            company.phone = body.phone;
            company.cellphone = body.cellphone;
            company.email = body.email;
            company.legalRepresentant = body.legalRepresentant;
            company.fundationDate = body.fundationDate;
            company.img = body.img;
            company.idTenant = body.idTenant;
            company.idCity = body.idCity;
            company.idUser = body.idUser;
            company.idState = body.idState;
            company.idCountry = body.idCountry;
            company.idEntityRisks = body.idEntityRisks;
            company.idCompensationFund = body.idCompensationFund;
            company.idIdentificationType = body.idIdentificationType;
            company.startDemoDay = body.startDemoDay,
                company.demoDay = body.demoDay,


                company.save(req.body)
                .then(companyActualizado => {
                    res.status(201).json({
                        ok: true,
                        company: companyActualizado,
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
//crear una nueva empresa TABLA COMPAÑIA INFO
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var company = new Company.company({

        name: body.name,
        // id: body.id,
        startDemoDay: body.startDemoDay,
        demoDay: body.demoDay,
        email: body.email,
        createUser: body.createUser,
        updateUser: body.updateUser,
        idUser: body.idUser,
        isActive: body.isActive,
        idTenant: body.idTenant,



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


module.exports = app;