const express = require('express');
const router = express.Router();
const controller = require('../controller/book.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id',controller.update);
router.get('/:id', controller.detail);
router.delete('/:id', controller.remove);

module.exports = router;
