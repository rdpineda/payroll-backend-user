var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Employee = require('../models');


//===================================================
//Obtener todos los empleados
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    Employee.employee.findAll()
        .then(employee => {

            res.status(200).json({
                ok: true,
                employee: employee
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Empleados',
                errors: err
            });
        })
});

// ==========================================
// Obtener un empleado por ID
// ==========================================

app.get('/employee/:id', (req, res) => {
    var id = req.params.id;
    Employee.employee.findByPk(id)
        .then(employee => {

            if (!employee) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empleado con el id ' + id + 'no existe',
                    errors: { message: 'No existe un empleado ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                employee: employee
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un empleado',
                errors: err
            });
        })

});



//===================================================
//actualizar un empleado
//===================================================

app.put('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE_o_mismoUsuario], (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Employee.employee.findByPk(id)
        .then(employee => {

            /* if (!usuario) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            } */

            employee.identification = body.identification;
            employee.firstname = body.firstname;
            employee.secondname = body.secondname;
            employee.surname = body.surname;
            employee.secondsurname = body.secondsurname;
            employee.birthDate = body.birthDate;
            employee.address = body.address;
            employee.phone = body.phone;
            employee.cellPhone = body.cellPhone;
            employee.email = body.email;
            employee.img = body.img;
            employee.idCompany = body.idCompany;
            employee.idCity = body.idCity;
            employee.idState = body.idState;
            employee.idCountry = body.idCountry;
            employee.isActive = body.isActive;
            employee.idGender = body.idGender;
            employee.idIdentificationType = body.idIdentificationType


            employee.save(req.body)
                .then(employeeActualizado => {
                    res.status(201).json({
                        ok: true,
                        employee: employeeActualizado,
                        // usuarioToken: req.usuario
                    });

                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar un empleado',
                        error: err
                    });

                })

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'El empleado con el id ' + id + ' no existe',
                errors: { message: 'No existe un empleado con ese ID' }
            });

        })






});







//===================================================
//crear un nuevo empleado
//===================================================

app.post('/', (req, res) => {
    var body = req.body;

    var employee = new Employee.employee({

        id: body.id,
        identification: body.identification,
        firstname: body.firstname,
        secondname: body.secondname,
        surname: body.surname,
        secondsurname: body.secondsurname,
        birthDate: body.birthDate,
        address: body.address,
        phone: body.phone,
        cellPhone: body.cellPhone,
        email: body.email,
        img: body.img,
        createUser: body.createUser,
        updateUser: body.updateUser,
        isActive: body.isActive,
        idCompany: body.idCompany,
        idCity: body.idCity,
        idState: body.idState,
        idCountry: body.idCountry,
        isActive: body.isActive,
        idGender: body.idGender,
        idIdentificationType: body.idIdentificationType



    });

    employee.save(req.body)
        .then(employeeGuardado => {
            res.status(201).json({
                ok: true,
                employee: employeeGuardado,
                // usuarioToken: req.usuario
            });

        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un empleado',
                err
            });

        })


});

//===================================================
//Eliminar un empleado
//===================================================

app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

    var id = req.params.id;

    Employee.employee.findByIdAndRemove(id, (err, employeeEliminado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un empleado',
                errors: err
            });
        }

        if (!employeeEliminado) {

            return res.status(400).json({
                ok: false,
                mensaje: 'No existe empleado con ese ID',
                errors: { message: 'No existe empleado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            employee: employee
        });


    });

});


// ==========================================
// Obtener empleados por compañia
// ==========================================

app.get('/:idcompany', (req, res) => {
    var idcompany = req.params.idcompany;
    Employee.employee.findAll({ where: { idCompany: idcompany } })
        .then(employee => {

            if (!employee) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compañia ' + id + 'no tiene empleados',
                    errors: { message: 'No existe un empleado para esa compañia' }
                });
            }
            res.status(200).json({
                ok: true,
                employee: employee
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empleados',
                errors: err
            });
        })

});

module.exports = app;