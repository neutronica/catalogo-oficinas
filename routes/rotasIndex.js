var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')

/* GET pagina principal (todas as oficinas) */
router.get('/', controllerIndex.tela_principal);

/* GET pagina principal somente com as oficinas com inscricoes abertas */
router.get('/abertas', controllerIndex.abertas);

/* GET pagina sobre */
router.get('/sobre', controllerIndex.sobre);

module.exports = router;
