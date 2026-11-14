// importacao do modulo que gerencia as oficinas na memoria
const oficinas = require('../model/oficinaMemoria.js')

// cria e ja exporta a funcao que sera responsavel pela tela de cadastro
exports.cria_get = async function (req, res) {
    var contexto = {
        titulo_pagina: "Nova Oficina",
        menu_nova: true,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('criaOficina', contexto);
}

// cria e ja exporta a funcao que sera responsavel pelo cadastro da oficina
exports.cria_post = async function (req, res) {
    // obtem as informacoes do formulario
    var titulo = req.body.titulo;
    var responsavel = req.body.responsavel;
    var descricao = req.body.descricao;
    // converte a carga horaria recebida para numero
    var cargaHoraria = Number(req.body.cargaHoraria);

    // cadastra a oficina (sempre com inscricoes abertas)
    await oficinas.cria(titulo, responsavel, descricao, cargaHoraria);

    // redireciona para a tela principal
    res.redirect('/');
}

// cria e ja exporta a funcao que sera responsavel pela consulta da oficina
exports.consulta_get = async function (req, res) {
    // informacao passada como parametro na url
    var id = Number(req.params.id);
    var oficina = await oficinas.consulta(id);

    var contexto = {
        titulo_pagina: "Consulta de Oficina",
        oficina: oficina,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('consultaOficina', contexto);
}

// cria e ja exporta a funcao que sera responsavel pela tela de edicao da oficina
exports.altera_get = async function (req, res) {
    // informacao passada como parametro na url
    var id = Number(req.params.id);
    var oficina = await oficinas.consulta(id);

    var contexto = {
        titulo_pagina: "Editar Oficina",
        oficina: oficina,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('alteraOficina', contexto);
}

// cria e ja exporta a funcao que sera responsavel pela edicao da oficina
exports.altera_post = async function (req, res) {
    // informacao passada como parametro na url
    var id = Number(req.params.id);

    // obtem as informacoes do formulario
    var titulo = req.body.titulo;
    var responsavel = req.body.responsavel;
    var descricao = req.body.descricao;
    // converte a carga horaria recebida para numero
    var cargaHoraria = Number(req.body.cargaHoraria);

    // atualiza a oficina preservando o ID e a situacao das inscricoes
    await oficinas.atualiza(id, titulo, responsavel, descricao, cargaHoraria);

    // redireciona para a tela principal
    res.redirect('/');
}

// cria e ja exporta a funcao que sera responsavel por alternar a situacao das inscricoes
exports.alterna = async function (req, res) {
    // informacao passada como parametro na url
    var id = Number(req.params.id);
    await oficinas.alternaSituacao(id);

    // redireciona para a tela principal
    res.redirect('/');
}

// cria e ja exporta a funcao que sera responsavel pela exclusao da oficina
exports.deleta = async function (req, res) {
    // informacao passada como parametro na url
    var id = Number(req.params.id);
    await oficinas.deleta(id);

    // redireciona para a tela principal
    res.redirect('/');
}

// cria e ja exporta a funcao que sera responsavel pela tela de pesquisa
exports.pesquisa_get = async function (req, res) {
    var contexto = {
        titulo_pagina: "Pesquisa de Oficinas",
        menu_pesquisa: true,
        pesquisou: false,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('pesquisaOficina', contexto);
}

// cria e ja exporta a funcao que sera responsavel pelo resultado da pesquisa
exports.pesquisa_post = async function (req, res) {
    // obtem o termo digitado no formulario
    var termo = req.body.termo;

    var contexto = {
        titulo_pagina: "Pesquisa de Oficinas",
        menu_pesquisa: true,
        pesquisou: true,
        termo: termo,
        resultado: await oficinas.pesquisa(termo),
    }

    // renderiza a mesma pagina com o resultado da pesquisa
    res.render('pesquisaOficina', contexto);
}

module.exports = exports;
