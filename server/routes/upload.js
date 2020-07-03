var express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

const Usuario = require('../models');
/* var Medico = require('../models/medico');*/
const Company = require('../models');

app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    //tipos de colecciones validas

    var tiposValidos = ['companys', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No es una coleccion valida',
            errors: { message: 'No es una coleccion valida' }
        });

    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se selecciono ningun archivo',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    //obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //extensiones validas

    var extensionesValidas = ['png', 'jpg', 'jpeg', 'git'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extensiones validas son:' + extensionesValidas.join(', ') }
        });
    }

    //nombre de archivo personalizado

    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    //mover el archivo del temporal a un path especifica

    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);



    })






});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.user.findByPk(id)
            .then(usuario => {

                var pathViejo = './uploads/usuarios/' + usuario.img;

                //si existe elimina la imagen anterior

                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, (err) => {

                    });
                }

                usuario.img = nombreArchivo;
                usuario.save(usuario)
                    .then(usuarioActualizado => {

                        return res.status(200).json({
                            ok: true,
                            mensaje: 'Imagen de usuario actualizada',
                            usuario: usuarioActualizado
                        });


                    })

            })
            .catch(err => {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe el usuario',
                    errors: { message: 'No existe el usuario' }
                });
            })

    }

    /*   if (tipo === 'medicos') {

          Medico.findById(id, (err, medico) => {

              if (!medico) {
                  return res.status(400).json({
                      ok: false,
                      mensaje: 'No existe el medico',
                      errors: { message: 'No existe el medico' }
                  });
              }

              var pathViejo = './uploads/medicos/' + medico.img;

              //si existe elimina la imagen anterior

              if (fs.existsSync(pathViejo)) {
                  fs.unlink(pathViejo, (err) => {

                  });
              }

              medico.img = nombreArchivo;
              medico.save((err, medicoActualizado) => {

                  return res.status(200).json({
                      ok: true,
                      mensaje: 'Imagen del medico actualizada',
                      medico: medicoActualizado
                  });
              });
          })



      } */

    if (tipo === 'companys') {

        Company.company.findByPk(id)
            .then(company => {

                var pathViejo = './uploads/companys/' + company.img;

                //si existe elimina la imagen anterior

                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, (err) => {

                    });
                }

                company.img = nombreArchivo;
                company.save(company)
                    .then(compañiaActualizada => {
                        return res.status(200).json({
                            ok: true,
                            mensaje: 'Imagen de la compañia se ha actualizado',
                            company: compañiaActualizada
                        });
                    })




            })
            .catch(err => {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe la compañia',
                    errors: { message: 'No existe la compañia' }
                });
            })
    }

}

module.exports = app;