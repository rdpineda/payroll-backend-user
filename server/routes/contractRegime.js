var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ContractRegime = require('../models');


//===================================================
//Obtener todos los tipos de Regimen
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    ContractRegime.contractRegime.findAll()
        .then(contractRegime => {

            res.status(200).json({
                ok: true,
                contractRegime: contractRegime
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de Regimen',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de Regimen
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ContractRegime.contractRegime.findByPk(id)
        .then(contractRegime => {

            if (!contractRegime) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de regimen con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de regimen con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                contractRegime: contractRegime

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de regimen',
                errors: err
            });
        })

});


module.exports = app;