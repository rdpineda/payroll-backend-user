var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const SocialSecurityEntity = require('../models');


//===================================================
//Obtener todas la entidades de seguridad social
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    SocialSecurityEntity.socialSecurityEntity.findAll()
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de seguridad social',
                errors: err
            });
        })
});


// ==========================================
// Obtener una entidad de seguiridad social por ID
// ==========================================

app.get('/:id/socialSecurityEntity', (req, res) => {
    var id = req.params.id;
    // SocialSecurityEntity.socialSecurityEntity.findByPk(id)
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { id: id } })
        .then(socialSecurityEntity => {

            if (!socialSecurityEntity) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la entidad SS con ' + id + 'no existe',
                    errors: { message: 'No existe una entidad SS con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar entidad SS',
                errors: err
            });
        })

});

// ==========================================
// Obtener una entidad SS por tipo "CAJA DE COMPENSACION" 
// ==========================================



app.get('/caja/:id', function(req, res) {
    var id = req.params.id;
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { idSocialSecurityEntityType: id }, raw: true })
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de cajas de compensacion',
                errors: err
            });
        })
});


// ==========================================
// Obtener una entidad SS por tipo "RIESGOS" 
// ==========================================



app.get('/riesgo/:id', function(req, res) {
    var id = req.params.id;
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { idSocialSecurityEntityType: id }, raw: true })
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de riesgos',
                errors: err
            });
        })
});



// ==========================================
// Obtener una entidad SS por tipo "SALUD" 
// ==========================================



app.get('/salud/:id', function(req, res) {
    var id = req.params.id;
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { idSocialSecurityEntityType: id }, raw: true })
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de salud',
                errors: err
            });
        })
});


// ==========================================
// Obtener una entidad SS por tipo "PENSION" 
// ==========================================



app.get('/pension/:id', function(req, res) {
    var id = req.params.id;
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { idSocialSecurityEntityType: id }, raw: true })
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de riesgos',
                errors: err
            });
        })
});


// ==========================================
// Obtener una entidad SS por tipo "CESANTIA" 
// ==========================================



app.get('/cesantia/:id', function(req, res) {
    var id = req.params.id;
    SocialSecurityEntity.socialSecurityEntity.findAll({ where: { idSocialSecurityEntityType: id }, raw: true })
        .then(socialSecurityEntity => {

            res.status(200).json({
                ok: true,
                socialSecurityEntity: socialSecurityEntity
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando entidades de riesgos',
                errors: err
            });
        })
});


module.exports = app;