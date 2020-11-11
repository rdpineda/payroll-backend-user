var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const AccountType = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    AccountType.accountType.findAll()
        .then(accountType => {

            res.status(200).json({
                ok: true,
                accountType: accountType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando tipo de cuentas',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id/accountType', (req, res) => {
    var id = req.params.id;
    // AccountType.accountType.findByPk(id)
    AccountType.accountType.findAll({ where: { id: id } })
        .then(accountType => {

            if (!accountType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de cuenta con ' + id + 'no existe',
                    errors: { message: 'No existe el tipo de cuenta con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                accountType: accountType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de cuenta',
                errors: err
            });
        })

});


module.exports = app;