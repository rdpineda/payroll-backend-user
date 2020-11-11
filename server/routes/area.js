var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Area = require('../models');


//===================================================
//Obtener todas las areas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Area.area.findAll()
        .then(area => {

            res.status(200).json({
                ok: true,
                area: area
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Areas',
                errors: err
            });
        })
});


// ==========================================
// Obtener un area por ID
// ==========================================

app.get('/:id/area', (req, res) => {
    var id = req.params.id;
    Area.area.findAll({ where: { id: id } })
        .then(area => {

            if (!area) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El area con el id' + id + 'no existe',
                    errors: { message: 'No existe un area ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                area: area

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar area',
                errors: err
            });
        })

});




//===================================================
//actualizar areas
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Area.area.findByPk(id)
        .then(area => {



            area.description = body.description;
            area.idCompany = body.idCompany;
            area.isActive = body.isActive;


            area.save(req.body)
                .then(areaGuardado => {
                    res.status(201).json({
                        ok: true,
                        area: areaGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un area',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El area con el id ' + id + ' no existe',
                errors: { message: 'No existe un area con ese ID' }
            });

        })






});







//===================================================
//crear una area
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var area = new Area.area({
        description: body.description,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idCompany: body.idCompany,


    });

    area.save(req.body)
        .then(areaGuardado => {
            res.status(201).json({
                ok: true,
                area: areaGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un area',
                err
            });

        })


});

//===================================================
//Eliminar una empresa
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Area.area.findByIdAndRemove(id, (err, areaEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un area',
                errors: err
            });
        }

        if (!areaEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe area con ese ID',
                errors: { message: 'No existe area con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            area: area
        });


    });

});

// ==========================================
// Obtener area por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    Area.area.findAll({ where: { idCompany: idcompany } })
        .then(area => {

            if (!area) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene areas',
                    errors: { message: 'No existe un areas para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                area: area
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar areas',
                errors: err
            });
        })

});


// ==========================================
// Obtener area por compañia activos
// ==========================================

app.get('/:idcompany/isActive', (req, res) => {
    var idcompany = req.params.idcompany;
    Area.area.findAll({ where: { idCompany: idcompany, isActive: 'true' } })
        .then(area => {

            if (!area) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene areas',
                    errors: { message: 'No existe un areas para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                area: area
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar areas',
                errors: err
            });
        })

});



module.exports = app;