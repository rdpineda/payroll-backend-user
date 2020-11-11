var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const CostCenter = require('../models');


//===================================================
//Obtener todos los centros de costos
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    CostCenter.costCenter.findAll()
        .then(costCenter => {

            res.status(200).json({
                ok: true,
                costCenter: costCenter
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Centros de Costos',
                errors: err
            });
        })
});


// ==========================================
// Obtener un centro de costo por ID
// ==========================================


app.get('/:id/cecos', (req, res) => {
    var id = req.params.id;
    CostCenter.costCenter.findAll({ where: { id: id } })

    .then(costCenter => {

            if (!costCenter) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El centro de costo con el id' + id + 'no existe',
                    errors: { message: 'No existe un centro de costo ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                costCenter: costCenter

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar centro de costo',
                errors: err
            });
        })

});




//===================================================
//actualizar un centro de costo
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    CostCenter.costCenter.findByPk(id)
        .then(costCenter => {


            costCenter.code = body.code;
            costCenter.description = body.description;
            costCenter.idSpendingAccount = body.idSpendingAccount;
            costCenter.idCompany = body.idCompany;
            costCenter.isActive = body.isActive;


            costCenter.save(req.body)
                .then(costCenterGuardado => {
                    res.status(201).json({
                        ok: true,
                        costCenter: costCenterGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un centro de costo',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El centro de costo con el id ' + id + ' no existe',
                errors: { message: 'No existe un centro de costo con ese ID' }
            });

        })






});







//===================================================
//crear un centro de costo
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var costCenter = new CostCenter.costCenter({
        code: body.code,
        description: body.description,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idSpendingAccount: body.idSpendingAccount,
        idCompany: body.idCompany,


    });

    costCenter.save(req.body)
        .then(costCenterGuardado => {
            res.status(201).json({
                ok: true,
                costCenter: costCenterGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un centro de costo',
                err
            });

        })


});

//===================================================
//Eliminar un centro de costo
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    CostCenter.costCenter.findByIdAndRemove(id, (err, costCenterEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un centro de costo',
                errors: err
            });
        }

        if (!costCenterEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe centro de costo con ese ID',
                errors: { message: 'No existe centro de costo con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            costCenter: costCenterEliminado
        });


    });

});

// ==========================================
// Obtener Centros de costos por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    CostCenter.costCenter.findAll({ where: { idCompany: idcompany } })
        .then(costCenter => {

            if (!costCenter) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene centros de costos',
                    errors: { message: 'No existe un centro de costos para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                costCenter: costCenter
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar centrp de costo',
                errors: err
            });
        })

});


// ==========================================
// Obtener Centros de costos por compañia activos
// ==========================================

app.get('/:idcompany/isActive', (req, res) => {
    var idcompany = req.params.idcompany;
    CostCenter.costCenter.findAll({ where: { idCompany: idcompany, isActive: 'true' } })
        .then(costCenter => {

            if (!costCenter) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene centros de costos',
                    errors: { message: 'No existe un centro de costos para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                costCenter: costCenter
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar centrp de costo',
                errors: err
            });
        })

});


module.exports = app;