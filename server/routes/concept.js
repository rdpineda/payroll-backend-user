var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Concept = require('../models');
const Company = require('../models');
const Accumulator = require('../models');
const ConceptCategory = require('../models');



//===================================================
//Obtener todos los conceptos 
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Concept.concept.findAll({ where: { companyId: null } })
        .then(concept => {

            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando conceptos',
                errors: err
            });
        });
});







//===================================================
//Obtener todos los conceptos con acumulador
//===================================================

app.get('/accumulator', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Concept.concept.findAll({ include: Accumulator.accumulator })
        .then(concept => {

            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando conceptos',
                errors: err
            });
        });
});


//===================================================
//Obtener todos los conceptos con categoria
//===================================================

app.get('/category', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Concept.concept.findAll({ include: ConceptCategory.conceptCategory })
        .then(concept => {

            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando conceptos',
                errors: err
            });
        });
});


//===================================================
//Obtener todos los conceptos con categoria SALARIO
//===================================================

app.get('/category/salar/:idcompany', function(req, res) {
    var idcompany = req.params.idcompany;

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Concept.concept.findAll({
            include: [{
                model: ConceptCategory.conceptCategory,
                where: { code: 'SALAR' }


            }],
            where: { companyId: idcompany },
            order: ['code']


        })
        .then(concept => {

            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando conceptos',
                errors: err
            });
        });
});




// ==========================================
// Obtener un concepto por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Concept.concept.findByPk(id)
        .then(concept => {

            if (!concept) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El concepto con el id' + id + 'no existe',
                    errors: { message: 'No existe un concepto ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                concept: concept

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar concepto',
                errors: err
            });
        });

});




//===================================================
//actualizar un concepto
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Concept.concept.findByPk(id)
        .then(concept => {


            concept.code = body.code;
            concept.description = body.description;
            concept.companyId = body.companyId;
            concept.account = body.account;
            concept.counterPart = body.counterPart;
            concept.conceptTypeId = body.conceptTypeId;
            concept.conceptCategoryId = body.conceptCategoryId;
            concept.createUser = body.createUser;
            concept.updateUser = body.updateUser;
            concept.isActive = body.isActive;





            concept.save(req.body)
                .then(conceptGuardado => {
                    res.status(201).json({
                        ok: true,
                        concept: conceptGuardado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un concepto',
                        error: err
                    });

                });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El concepto con el id ' + id + ' no existe',
                errors: { message: 'No existe un concepto con ese ID' }
            });

        });






});







//===================================================
//crear un nuevo concepto
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var concept = new Concept.concept({
        code: body.code,
        description: body.description,
        companyId: body.companyId,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        account: body.account,
        counterPart: body.counterPart,
        conceptTypeId: body.conceptTypeId,
        conceptCategoryId: body.conceptCategoryId,

    });

    concept.save(req.body)
        .then(conceptGuardado => {
            res.status(201).json({
                ok: true,
                concept: conceptGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un concepto',
                err
            });

        })


});


//===================================================
//crear los concepto estandar en cada cliente
//===================================================

app.post('/estandar/:id', async(req, res) => {
    var id = req.params.id;

    Company.company.findOne({
            where: { id: id }
        })
        .then(async companyDB => {
            console.log('primera consulta', companyDB);


            Concept.concept.bulkCreate(await obtenerConceptos(), { individualHooks: true })
                .then(conceptGuardado => {
                    console.log('hola concepto', conceptGuardado.length);
                    for (var i = 0; i < conceptGuardado.length; i++) {
                        Concept.concept.update({ companyId: companyDB.id }, /* set attributes' value */ { where: { id: conceptGuardado[i].id } } /* where criteria */ );
                        console.log('hola concepto guardado', conceptGuardado[i].id);
                    }

                    res.status(201).json({
                        ok: true,
                        concept: conceptGuardado,

                        // usuarioToken: req.usuario

                    });
                    console.log('hola concepto2', conceptGuardado[0].id);
                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear un concepto',
                        err
                    });

                });

        });
});





//===================================================
//Eliminar un concepto
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Concept.concept.findByIdAndRemove(id, (err, conceptEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un concepto',
                errors: err
            });
        }

        if (!conceptEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe concepto con ese ID',
                errors: { message: 'No existe concepto con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            concept: conceptEliminado
        });


    });

});

// ==========================================
// Obtener conceptos por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    const { Op } = require("sequelize");
    // var idconceptGroup = '0f91a6e0-8192-4a2e-8022-989257fc2896';
    Concept.concept.findAll({
            where: {
                [Op.or]: [{ idCompany: idcompany }]
            }
        })
        .then(concept => {

            if (!concept) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene conceptos',
                    errors: { message: 'No existe un conceptos para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                concept: concept
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar conceptos',
                err: err
            });
        });

});


async function obtenerConceptos() {

    var conceptos = await Concept.concept.findAll({

        attributes: ['code', 'description', 'companyId', 'createdAt', 'createUser', 'updatedAt', 'updateUser', 'isActive', 'account', 'counterPart', 'conceptTypeId', 'conceptCategoryId'],
        where: { companyId: null },
        raw: true
    });

    return conceptos;
}


module.exports = app;