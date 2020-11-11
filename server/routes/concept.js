var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Concept = require('../models');


//===================================================
//Obtener todos los conceptos
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Concept.concept.findAll()
        .then(concept => {

            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando conceptos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un concepto por ID
// ==========================================

app.get('/concept/:id', (req, res) => {
    var id = req.params.id;
    Concept.concept.findByPk(id)
        .then(concept => {

            if (!concept) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El concepto con el id' + id + 'no existe',
                    errors: { message: 'No existe un concepto ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                concept: concept

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar concepto',
                errors: err
            });
        })

});




//===================================================
//actualizar un concepto
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Concept.concept.findByPk(id)
        .then(concept => {


            concept.code = body.code;
            concept.description = body.description;
            concept.idConcepGroup = body.idConcepGroup;
            concept.idConcepType = body.idConcepType;
            concept.idCompany = body.idCompany;
            concept.isActive = body.isActive;
            concept.account = body.account;
            concept.counterPart = body.counterPart


            concept.save(req.body)
                .then(conceptGuardado => {
                    res.status(201).json({
                        ok: true,
                        concept: conceptGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un concepto',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El concepto con el id ' + id + ' no existe',
                errors: { message: 'No existe un concepto con ese ID' }
            });

        })






});







//===================================================
//crear un nuevo concepto
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var concept = new Concept.concept({
        code: body.code,
        description: body.description,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idConcepGroup: body.idConcepGroup,
        idConcepType: body.idConcepType,
        idCompany: body.idCompany,
        account: body.account,
        counterPart: body.counterPart


    });

    concept.save(req.body)
        .then(conceptGuardado => {
            res.status(201).json({
                ok: true,
                concept: conceptGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un centro de costo',
                err
            });

        })


});

//===================================================
//Eliminar un concepto
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Concept.concept.findByIdAndRemove(id, (err, conceptEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un concepto',
                errors: err
            });
        }

        if (!conceptEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe concepto con ese ID',
                errors: { message: 'No existe concepto con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            concept: conceptEliminado
        });


    });

});

// ==========================================
// Obtener conceptos por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    const { Op } = require("sequelize");
    // var idconceptGroup = '0f91a6e0-8192-4a2e-8022-989257fc2896';
    Concept.concept.findAll({
            where: {
                [Op.or]: [{ idCompany: idcompany }, { idCompany: null }]
            }
        })
        .then(concept => {

            if (!concept) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene conceptos',
                    errors: { message: 'No existe un conceptos para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar conceptos',
                err: err
            });
        })

});


module.exports = app;