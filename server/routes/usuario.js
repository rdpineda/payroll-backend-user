var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Usuario = require('../models');

// var Usuario = require('../server/models/usuario');

//===================================================
//Obtener todos usuarios
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Usuario.user.findAll({ attributes: ['id', 'name', 'userName', 'password', 'idRol', 'img'] })
        .then(usuarios => {

            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuarios',
                errors: err
            });
        })
});



//===================================================
//actualizar un  usuario
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.user.findByPk(id)
        .then(usuario => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */

            usuario.name = body.name;
            usuario.userName = body.userName;
            usuario.cellPhone = body.cellPhone;
            usuario.idRol = body.idRol;

            usuario.save(req.body)
                .then(usuarioGuardado => {
                    res.status(201).json({
                        ok: true,
                        usuario: usuarioGuardado,
                        /* usuarioToken: req.usuario */
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un usuario',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });

        })






});







//===================================================
//crear un nuevo usuario
//===================================================

app.post('/', (req, res) => {
    var body = req.body;


    Usuario.user.findOne({ where: { userName: body.userName } })

    .then(usuarioDB => {
        if (usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Ya Existe un usuario con este Email'

                }

            });
        }




        var usuario = new Usuario.user({
            name: body.name,
            userName: body.userName,
            password: bcrypt.hashSync(body.password, 10),
            img: body.img,
            isActive: body.isActive,
            cellPhone: body.cellPhone,
            idRol: body.idRol,
            createUser: body.createUser,
            updateUser: body.updateUser

        });

        usuario.save(req.body)
            .then(usuarioGuardado => {
                res.status(201).json({
                    ok: true,
                    usuario: usuarioGuardado,
                    // usuarioToken: req.usuario
                });

            })
            .catch(err => {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear un usuario',
                    err
                });

            })

    });
});

//===================================================
//Eliminar un  usuario
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un usuario',
                errors: err
            });
        }

        if (!usuarioEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe usuario con ese ID',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });


    });

});


module.exports = app;