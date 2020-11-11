var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Subsidiary = require('../models');


//===================================================
//Obtener todas las sucursales
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Subsidiary.subsidiary.findAll()
        .then(subsidiary => {

            res.status(200).json({
                ok: true,
                subsidiary: subsidiary
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando sucursales',
                errors: err
            });
        })
});


// ==========================================
// Obtener una sucursal por ID
// ==========================================

app.get('/:id/subsidiary', (req, res) => {
    var id = req.params.id;
    Subsidiary.subsidiary.findAll({ where: { id: id } })
        .then(subsidiary => {

            if (!subsidiary) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la sucursal con el id' + id + 'no existe',
                    errors: { message: 'No existe un sucursal ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                subsidiary: subsidiary

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sucursal',
                errors: err
            });
        })

});




//===================================================
//actualizar sucursales
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Subsidiary.subsidiary.findByPk(id)
        .then(subsidiary => {



            subsidiary.description = body.description;
            subsidiary.idCompany = body.idCompany;
            subsidiary.isActive = body.isActive;


            subsidiary.save(req.body)
                .then(subsidiaryGuardado => {
                    res.status(201).json({
                        ok: true,
                        subsidiary: subsidiaryGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un sucursal',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El sucursal con el id ' + id + ' no existe',
                errors: { message: 'No existe un sucursal con ese ID' }
            });

        })






});







//===================================================
//crear una area
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var subsidiary = new Subsidiary.subsidiary({
        description: body.description,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idCompany: body.idCompany,


    });

    subsidiary.save(req.body)
        .then(subsidiaryGuardado => {
            res.status(201).json({
                ok: true,
                subsidiary: subsidiaryGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear una sucursal',
                err
            });

        })


});

//===================================================
//Eliminar una empresa
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Subsidiary.subsidiary.findByIdAndRemove(id, (err, subsidiaryEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar una sucursal',
                errors: err
            });
        }

        if (!subsidiaryEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe sucursal con ese ID',
                errors: { message: 'No existe sucursal con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            subsidiary: subsidiary
        });


    });

});

// ==========================================
// Obtener sucursales por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    Subsidiary.subsidiary.findAll({
            where: {
                idCompany: idcompany

            }
        })
        .then(subsidiary => {

            if (!subsidiary) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene sucursales',
                    errors: { message: 'No existe un sucursales para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                subsidiary: subsidiary
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sucursales',
                errors: err
            });
        })

});


// ==========================================
// Obtener sucursales por compañia activas
// ==========================================

app.get('/:idcompany/isActive', (req, res) => {
    var idcompany = req.params.idcompany;
    Subsidiary.subsidiary.findAll({
            where: {
                idCompany: idcompany,
                isActive: 'true'
            }
        })
        .then(subsidiary => {

            if (!subsidiary) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene sucursales',
                    errors: { message: 'No existe un sucursales para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                subsidiary: subsidiary
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sucursales',
                errors: err
            });
        })

});


module.exports = app;