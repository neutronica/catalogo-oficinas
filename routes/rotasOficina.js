var express = require('express');
var router = express.Router();
var controllerOficina = require('../controller/controllerOficina.js');

/* GET Cadastro de Oficina */
router.get('/cria', controllerOficina.cria_get);

/* POST Cadastro de Oficina */
router.post('/cria', controllerOficina.cria_post);

/* GET Consulta de Oficina */
router.get('/consulta/:id', controllerOficina.consulta_get);

/* GET Edicao de Oficina */
router.get('/altera/:id', controllerOficina.altera_get);

/* POST Edicao de Oficina */
router.post('/altera/:id', controllerOficina.altera_post);

/* GET Alterna a situacao das inscricoes */
router.get('/alterna/:id', controllerOficina.alterna);

/* GET Exclusao de Oficina (apos confirmacao na janela modal) */
router.get('/deleta/:id', controllerOficina.deleta);

/* GET Pesquisa de Oficinas */
router.get('/pesquisa', controllerOficina.pesquisa_get);

/* POST Pesquisa de Oficinas */
router.post('/pesquisa', controllerOficina.pesquisa_post);

module.exports = router;
