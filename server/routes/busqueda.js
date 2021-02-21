var express = require('express');
// var Employee = require('../models/employee');
/* var Medico = require('../models/medico');
var Usuario = require('../models/usuario'); */
const { Op } = require("sequelize");
const Employee = require('../models');
var app = express();

//==================================================
//busqueda especifica
//==================================================
app.get('/coleccion/:tabla/:busqueda', async(req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = busqueda;

    var promesa;

    switch (tabla) {

        case 'employee':
            promesa = buscarEmployees(busqueda, regex);

            break;

        default:

            return res.status(400).json({
                ok: false,
                message: 'Los tipos de busqueda solo son empleados',
                error: { message: 'Tipo de tabla/coleccion no validos' }
            });

    }

    promesa.then(async data => {


        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    });

});


async function buscarEmployees(busqueda, regex) {

    // return new Promise((resolve, reject) => {

    var consulta = await Employee.employee.findAll({
        where: {
            [Op.or]: {
                firstname: {
                    [Op.iRegexp]: regex
                },

                identification: {
                    [Op.iRegexp]: regex
                },
                surname: {
                    [Op.iRegexp]: regex
                }
            }
        }
    });

    return consulta;




    // });
}


//==================================================
//busqueda general
//==================================================

/* app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarHospitales(busqueda, regex),
            buscarMedicos(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            });

        })
});
 */
/* function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec((err, hospitales) => {

                if (err) {
                    reject('Error al cargar hospitales', err);
                } else {
                    resolve(hospitales);
                }
            });

    });


} */

/* function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Medico.find({ nombre: regex })
            .populate('hospital', 'nombre email img')
            .exec((err, medicos) => {

                if (err) {
                    reject('Error al cargar medicos', err);
                } else {
                    resolve(medicos);
                }

            });

    });


} */



module.exports = app;