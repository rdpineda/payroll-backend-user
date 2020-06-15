var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { Model, DataTypes, Deferrable } = require("sequelize");


var SEED = require('../../config/config').SEED;

var app = express();

const Usuario = require('../models');
const Company = require('../models');
const UserCompany = require('../models');
const Rol = require('../models');




//google


var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


//===================================================
//renovar el token
//====================================================

var mdAutenticacion = require('../../middlewares/autenticacion');

app.get('/renuevatoken', mdAutenticacion.verificaToken, (req, res) => {

    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 });
    res.status(200).json({
        ok: true,
        token: token
    });
});





//===================================================
//autenticacion google
//====================================================

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;
    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                mensaje: 'token no valido',
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB));

    if (err) {

        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar un usuario',
            errors: err
        });
    }

    if (usuarioDB) {

        if (usuarioDB.google === false) {
            return res.status(400).json({
                ok: false,
                mensaje: 'debe de utilizar su autenticacion normal',

            });

        } else {
            var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            });

        }
    } else {
        //el usuario no existe hay que crearlo

        var usuario = new Usuario();

        usuario.nombre = googleUser.name;
        usuario.email = googleUser.email;
        usuario.img = googleUser.img;
        usuario.google = true;
        usuario.password = ':)';


        usuario.save((err, usuarioDB) => {
            var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            });
        });

    }


    res.status(200).json({
        ok: true,
        mensaje: 'OK!!',
        googleUser: googleUser


    });


});


//===================================================
//autenticacion normal
//====================================================

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.user.findOne({
        where: { userName: body.userName },
        include: { model }
    })

    .then(usuarioDB => {

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'usuario no existe'

                    }

                });
            }

            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'Credenciales incorrectas'
                    }

                });
            }
            //obtener empresa usuario logueado

            //
            //crear token
            usuarioDB.password = ':)';
            var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB.id,
                role: usuarioDB.idRol,
                empresas: obtenerEmpresas(),
                menu: obtenerMenu(usuarioDB.role)


            });

        })
        .catch(err => {


            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un usuario1',
                err
            });


        })





});

function obtenerMenu(role) {

    var menu = [{
            titulo: 'Dashboard',
            url: '/dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                //{ titulo: 'Usuarios', url: '/usuarios' },
                /* { titulo: 'Hospitales', url: '/hospitales' },
                { titulo: 'Medicos', url: '/medicos' } */
            ]
        },
        {
            titulo: 'Empleados',
            url: '/medicos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                /*  //{ titulo: 'Usuarios', url: '/usuarios' },
                 { titulo: 'Hospitales', url: '/hospitales' },
                 { titulo: 'Medicos', url: '/medicos' } */
            ]
        },

        {
            titulo: 'Empresa',
            url: '/hospitales',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                /*  //{ titulo: 'Usuarios', url: '/usuarios' },
                 { titulo: 'Hospitales', url: '/hospitales' },
                 { titulo: 'Medicos', url: '/medicos' } */
            ]
        },
        {
            titulo: 'Nóminas',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Ordinarias', url: '/usuarios' },
                { titulo: 'Especiales', url: '/hospitales' },
                { titulo: 'Históricos', url: '/medicos' }
            ]
        },
        {
            titulo: 'Config Contable',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                /* { titulo: 'Ordinarias', url: '/usuarios' },
                { titulo: 'Especiales', url: '/hospitales' },
                { titulo: 'Históricos', url: '/medicos' } */
            ]
        },
        {
            titulo: 'Reportes',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                /* { titulo: 'Ordinarias', url: '/usuarios' },
                { titulo: 'Especiales', url: '/hospitales' },
                { titulo: 'Históricos', url: '/medicos' } */
            ]
        }

    ];

    if (role === '37188fd7-f43b-4874-bd1a-54c5cce8afee') {

        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });

    }

    return menu;

}


const obtenerEmpresas = async(req, res) => {
    const empresas = await UserCompany.userCompany.findAll({ where: { idUser: '6be454f0-aab5-11ea-88b8-8dd8cc3d0a51' } })
        .then(empresas => {
            return res.send(empresas);
        })
}


module.exports = app;