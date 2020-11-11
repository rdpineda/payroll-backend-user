var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Position = require('../models');


//===================================================
//Obtener todos los cargos
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Position.position.findAll()
        .then(position => {

            res.status(200).json({
                ok: true,
                position: position
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando cargos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un cargo por ID
// ==========================================

app.get('/:id/position', (req, res) => {
    var id = req.params.id;
    Position.position.findAll({ where: { id: id } })
        .then(position => {

            if (!position) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El cargo con el id' + id + 'no existe',
                    errors: { message: 'No existe un cargo ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                position: position

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar cargos',
                errors: err
            });
        })

});




//===================================================
//actualizar cargos
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Position.position.findByPk(id)
        .then(position => {



            position.description = body.description;
            position.idCompany = body.idCompany;
            position.isActive = body.isActive;


            position.save(req.body)
                .then(positionGuardado => {
                    res.status(201).json({
                        ok: true,
                        position: positionGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un cargo',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El cargo con el id ' + id + ' no existe',
                errors: { message: 'No existe un cargo con ese ID' }
            });

        })






});







//===================================================
//crear un cargo
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var position = new Position.position({
        description: body.description,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idCompany: body.idCompany,


    });

    position.save(req.body)
        .then(positionGuardado => {
            res.status(201).json({
                ok: true,
                position: positionGuardado,
                //usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un cargo',
                err
            });

        })


});

//===================================================
//Eliminar una empresa
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Position.position.findByIdAndRemove(id, (err, positionEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un cargo',
                errors: err
            });
        }

        if (!positionEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe cargo con ese ID',
                errors: { message: 'No existe cargo con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            position: position
        });


    });

});

// ==========================================
// Obtener cargo por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    Position.position.findAll({ where: { idCompany: idcompany } })
        .then(position => {

            if (!position) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene cargos',
                    errors: { message: 'No existe un cargod para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                position: position
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar cargos',
                errors: err
            });
        })

});

//==========================================
// Obtener cargo por compañia activos
// ==========================================

app.get('/:idcompany/isActive', (req, res) => {
    var idcompany = req.params.idcompany;
    Position.position.findAll({ where: { idCompany: idcompany, isActive: 'true' } })
        .then(position => {

            if (!position) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene cargos',
                    errors: { message: 'No existe un cargod para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                position: position
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar cargos',
                errors: err
            });
        })

});


module.exports = app;