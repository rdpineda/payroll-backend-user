//Requires

var express = require('express');
var bodyParser = require('body-parser');




// inicializar variables

var app = express();

// CORS



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//body parse
// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// importar rutas



var appRoutes = require('./server/routes/app');
var usuarioRoutes = require('./server/routes/usuario');
var companyRoutes = require('./server/routes/company');
var companyInfoRoutes = require('./server/routes/companyInfo');
/*var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');*/
var uploadRoutes = require('./server/routes/upload');
var imagenRoutes = require('./server/routes/imagenes');

var loginRoutes = require('./server/routes/login');



//conexion a la base de datos
//const Sequelize = require('sequelize');





// fin conexion base de datos

//server index config

/* var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads')); */

// rutas

app.use('/usuario', usuarioRoutes);
app.use('/company', companyRoutes);
app.use('/companyInfo', companyInfoRoutes);
/* app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);*/
app.use('/upload', uploadRoutes);
app.use('/imagen', imagenRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);






// escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});