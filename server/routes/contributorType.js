var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const ContributorType = require('../models');


//===================================================
//Obtener todos los tipos de contribuyente
//===================================================

app.get('/', function(req, res) {

    ContributorType.contributorType.findAll()
        .then(contributorType => {

            res.status(200).json({
                ok: true,
                contributorType: contributorType
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando tipo de contribuyentes',
                errors: err
            });
        })
});


// ==========================================
// Obtener un tipo de contribuyente por ID
// ==========================================

app.get('/:id/contributorType', (req, res) => {
    var id = req.params.id;
    // ContributorType.contributorType.findByPk(id)
    ContributorType.contributorType.findAll({ where: { id: id } })
        .then(contributorType => {

            if (!contributorType) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el tipo de contribuyente con ' + id + 'no existe',
                    errors: { message: 'No existe el tipo de contribuyente con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                contributorType: contributorType

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un tipo de contribuyente',
                errors: err
            });
        })

});


module.exports = app;