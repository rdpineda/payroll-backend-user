var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//===================================================
//Verificar token
//===================================================

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {

            return res.status(401).json({
                ok: false,
                mensaje: 'token incorreto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();

    });


}

//===================================================
//Verificar ADMINISTRADOR
//===================================================

exports.verificaADMIN_ROLE = function(req, res, next) {


    var usuario = req.usuario;
    console.log(usuario.role)

    if (usuario.idRol === '37188fd7-f43b-4874-bd1a-54c5cce8afee') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'token incorreto',
            errors: { message: 'no es administrador' }
        });
    }
}

//===================================================
//Verificar ADMINISTRADOR o mismo USUARIO
//===================================================

exports.verificaADMIN_ROLE_o_mismoUsuario = function(req, res, next) {


    var usuario = req.usuario;
    var id = req.params.id;
    console.log(usuario);
    console.log(usuario.role);
    console.log(usuario.id);

    if (usuario.idRol === '37188fd7-f43b-4874-bd1a-54c5cce8afee' || usuario.id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'token incorreto',
            errors: { message: 'no es administrador' }
        });
    }
}