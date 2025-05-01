const express = require('express');
const router = express.Router();
const controller = require('../controller/book.controller');
const upload = require('../config/multer');

router.get('/', controller.getAll);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', upload.single('image'), controller.update);
router.get('/:id', controller.detail);
router.delete('/:id', controller.remove);

module.exports = router;
