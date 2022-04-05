const express = require('express');
const cProducto = require('../controllers/cProducto');

const router = express.Router();

router.get('/', cProducto.listall);
router.post('/', cProducto.create)
router.get('/:key/:value', cProducto.find, cProducto.show)
router.put('/:key/:value', cProducto.find, cProducto.update)
router.delete('/:key/:value', cProducto.find, cProducto.deleted)

module.exports = router;