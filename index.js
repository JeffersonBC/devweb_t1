var express = require('express');
var request = require('request');

require('./js/urls.js')();

// Inicializa app
var app = express();
app.listen(8080);
app.use(express.static(__dirname + '/'));

// Cria databases caso ainda não tenham sido criadas
StartDB();

// Inicializa as URLs usadas no site
MainURLS(app, __dirname);
LoginURLS(app, __dirname);
UserAreaURLS(app, __dirname);
AdmAreaURLS(app, __dirname);

function StartDB(){
    request('http://localhost:5984/doggos_users', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_users');
            console.log("Database doggos_users criado");
        }
    });

    request('http://localhost:5984/doggos_products', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_products');
            console.log("Database doggos_products criado");
        }
    });

    request('http://localhost:5984/doggos_services', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_services');
            console.log("Database doggos_services criado");
        }
    });

    request('http://localhost:5984/doggos_shceduling', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_shceduling');
            console.log("Database doggos_shceduling criado");
        }
    });

    request('http://localhost:5984/doggos_sales', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_sales');
            console.log("Database doggos_sales criado");
        }
    });

    request('http://localhost:5984/doggos_animals', function (error, response, body) {
        if (response.statusCode == 404) {
            request.put('http://localhost:5984/doggos_animals');
            console.log("Database doggos_animals criado");
        }
    });
}