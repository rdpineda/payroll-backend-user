var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ContributorSubType = require('../models');


//===================================================
//Obtener todos los sub tipos de contribuyente
//===================================================

app.get('/', function(req, res) {

    ContributorSubType.contributorSubType.findAll()
        .then(contributorSubType => {

            res.status(200).json({
                ok: true,
                contributorSubType: contributorSubType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando subtipo de contribuyentes',
                errors: err
            });
        })
});


// ==========================================
// Obtener un subtipo de contribuyente por ID
// ==========================================

app.get('/:id/contributorSubType', (req, res) => {
    var id = req.params.id;
    // ContributorSubType.contributorSubType.findByPk(id)
    ContributorSubType.contributorSubType.findAll({ where: { id: id } })
        .then(contributorSubType => {

            if (!contributorSubType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el subtipo de contribuyente con ' + id + 'no existe',
                    errors: { message: 'No existe el subtipo de contribuyente con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                contributorSubType: contributorSubType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un subtipo de contribuyente',
                errors: err
            });
        })

});


module.exports = app;