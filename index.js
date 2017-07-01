var express = require('express');
var fs = require('fs');

// Inicializa app
var app = express();
app.listen(8080);
app.use(express.static(__dirname + '/'));


// Página principal
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/carrinho', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/carrinho.html');
});

app.get('/carrinho_pagamento', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/carrinho_pag.html');
});

// Login
app.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/login/login.html');
});

app.get('/cadastro', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/login/reg_cliente.html');
});

// Área de Usuário
app.get('/area_usuario', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/area_usuario.html');
});

app.get('/area_usuario/editar_usuario', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/edit_usuario.html');
});


app.get('/area_usuario/animais', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/table_animais.html');
});

app.get('/area_usuario/animais/registar', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/reg_animal.html');
});

app.get('/area_usuario/animais/visualizar', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/vis_animal.html');
});

app.get('/area_usuario/animais', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/table_animais.html');
});


app.get('/area_usuario/agenda', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/agenda.html');
});

app.get('/area_usuario/calendario', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/calendario.html');
});

app.get('/area_usuario/calendario/cadastro', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_usuario/calendario_cadastro.html');
});



// Área de Administração
app.get('/area_adm', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/area_adm.html');
});

app.get('/area_adm/cadastro', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/reg_admin.html');
});


app.get('/area_adm/produtos', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/table_prod.html');
});

app.get('/area_adm/produtos/registrar', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/reg_prod.html');
});

app.get('/area_adm/produtos/vendas', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/vendas_prod.html');
});

app.get('/area_adm/produtos/estoque', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/update_prod.html');
});


app.get('/area_adm/servicos', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/table_servico.html');
});

app.get('/area_adm/servicos/registrar', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/reg_servico.html');
});

app.get('/area_adm/servicos/vendas', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/html/area_adm/vendas_servico.html');
});
