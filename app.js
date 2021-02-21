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
var companyPaymentRoutes = require('./server/routes/companyPayment');
var companyPayrollRoutes = require('./server/routes/companyPayroll');
var countryRoutes = require('./server/routes/country');
var stateRoutes = require('./server/routes/state');
var spendingAccountRoutes = require('./server/routes/spendingAccount');
var cityRoutes = require('./server/routes/city');
var socialSecurityEntityRoutes = require('./server/routes/socialSecurityEntity');
var identificationTypeRoutes = require('./server/routes/identificationType');
var paymentFrequencyRoutes = require('./server/routes/paymentFrequency');
var paymentMethodRoutes = require('./server/routes/paymentMethod');
var bankRoutes = require('./server/routes/bank');
var accountTypeRoutes = require('./server/routes/accountType');
var costCenterRoutes = require('./server/routes/costCenter');
var areaRoutes = require('./server/routes/area');
var genderRoutes = require('./server/routes/gender');
var employeeRoutes = require('./server/routes/employee');
var subsidiaryRoutes = require('./server/routes/subsidiary');
var positionRoutes = require('./server/routes/position');
var conceptCategoryRoutes = require('./server/routes/conceptCategory');
var conceptRoutes = require('./server/routes/concept');
var accumulatorRoutes = require('./server/routes/accumulator');
var conceptAccumulatorRoutes = require('./server/routes/conceptAccumulator');
var contractRegimeRoutes = require('./server/routes/contractRegime');
var employeeTypeRoutes = require('./server/routes/employeeType');
var workingHourRoutes = require('./server/routes/workingHour');
var contractTypeRoutes = require('./server/routes/contractType');
var salaryTypeRoutes = require('./server/routes/salaryType');
var workPlaceRisksRoutes = require('./server/routes/workPlaceRisks');
var contributorTypeRoutes = require('./server/routes/contributorType');
var contributorSubTypeRoutes = require('./server/routes/contributorSubType');
var employeeWorkingRoutes = require('./server/routes/employeeWorking');
var employeeContractRoutes = require('./server/routes/employeeContract');
var employeeSalaryRoutes = require('./server/routes/employeeSalary');
var employeeJobRoutes = require('./server/routes/employeeJob');
var employeePaymentRoutes = require('./server/routes/employeePayment');
var employeeSocialSecurityRoutes = require('./server/routes/employeeSocialSecurity');
var busquedaRoutes = require('./server/routes/busqueda');



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
app.use('/companyPayment', companyPaymentRoutes);
app.use('/companyPayroll', companyPayrollRoutes);
app.use('/country', countryRoutes);
app.use('/state', stateRoutes);
app.use('/city', cityRoutes);
app.use('/identificationType', identificationTypeRoutes);
app.use('/socialSecurityEntity', socialSecurityEntityRoutes)
app.use('/paymentFrequency', paymentFrequencyRoutes);
app.use('/spendingAccount', spendingAccountRoutes);
app.use('/paymentMethod', paymentMethodRoutes);
app.use('/bank', bankRoutes);
app.use('/accountType', accountTypeRoutes);
app.use('/costCenter', costCenterRoutes);
app.use('/area', areaRoutes);
app.use('/gender', genderRoutes);
app.use('/employee', employeeRoutes);
app.use('/subsidiary', subsidiaryRoutes);
app.use('/position', positionRoutes);
app.use('/conceptCategory', conceptCategoryRoutes);
app.use('/concept', conceptRoutes);
app.use('/accumulator', accumulatorRoutes);
app.use('/conceptAccumulator', conceptAccumulatorRoutes);
app.use('/contractRegime', contractRegimeRoutes);
app.use('/employeeType', employeeTypeRoutes);
app.use('/contractType', contractTypeRoutes);
app.use('/salaryType', salaryTypeRoutes);
app.use('/workingHour', workingHourRoutes);
app.use('/workPlaceRisks', workPlaceRisksRoutes);
app.use('/contributorType', contributorTypeRoutes);
app.use('/contributorSubType', contributorSubTypeRoutes);
app.use('/employeeWorking', employeeWorkingRoutes);
app.use('/employeeContract', employeeContractRoutes);
app.use('/employeeSalary', employeeSalaryRoutes);
app.use('/employeeJob', employeeJobRoutes);
app.use('/employeePayment', employeePaymentRoutes);
app.use('/employeeSocialSecurity', employeeSocialSecurityRoutes);
app.use('/busqueda', busquedaRoutes);

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