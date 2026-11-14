// importacao do modulo que gerencia as oficinas na memoria
const oficinas = require('../model/oficinaMemoria.js')

// cria e ja exporta a funcao que sera responsavel pela tela principal (todas as oficinas)
exports.tela_principal = async function (req, res) {
    var resumo = await oficinas.resumo();

    var contexto = {
        titulo_pagina: "Catálogo de Oficinas",
        menu_inicio: true,
        filtro_todas: true,
        resumo: resumo,
        catalogo_vazio: resumo.total === 0,
        oficinas: await oficinas.lista(),
    }

    // renderiza o arquivo index.hbs, dentro da pasta view
    res.render('index', contexto);
};

// cria e ja exporta a funcao que sera responsavel pela visualizacao das inscricoes abertas
exports.abertas = async function (req, res) {
    // o resumo sempre considera o catalogo completo
    var resumo = await oficinas.resumo();

    var contexto = {
        titulo_pagina: "Catálogo de Oficinas - Inscrições Abertas",
        menu_inicio: true,
        filtro_abertas: true,
        resumo: resumo,
        catalogo_vazio: resumo.total === 0,
        oficinas: await oficinas.listaAbertas(),
    }

    // reutiliza o mesmo template da tela principal
    res.render('index', contexto);
};

exports.sobre = async function (req, res) {
    var contexto = {
        titulo_pagina: "Sobre o Catálogo",
        menu_sobre: true,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('sobre', contexto);
};

module.exports = exports;
