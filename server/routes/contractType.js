var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ContractType = require('../models');


//===================================================
//Obtener todos los tipos de Contrato
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    ContractType.contractType.findAll()
        .then(contractType => {

            res.status(200).json({
                ok: true,
                contractType: contractType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Tipos de Contratos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de Contratos
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    ContractType.contractType.findByPk(id)
        .then(contractType => {

            if (!contractType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de contrato con ' + id + 'no existe',
                    errors: { message: 'No existe un tipo de contrato con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                contractType: contractType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de contrato',
                errors: err
            });
        })

});


module.exports = app;