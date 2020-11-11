var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const State = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    State.state.findAll()
        .then(state => {

            res.status(200).json({
                ok: true,
                state: state
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando departamentos',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    State.state.findByPk(id)
        .then(state => {

            if (!state) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el departamento con ' + id + 'no existe',
                    errors: { message: 'No existe un departamento con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                state: state

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un departamento',
                errors: err
            });
        })

});


module.exports = app;