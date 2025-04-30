const express = require('express');
const router = express.Router();

const bookRouter = require('./book.routes');
const categoryRouter = require('./category.routes'); 

router.use('/books', bookRouter);
router.use('/categories', categoryRouter);

module.exports = router;