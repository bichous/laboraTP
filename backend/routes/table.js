const router = require('express').Router();
const { allTables, createTable } = require('../controllers/tableController');

router.get('/allTables', allTables);

router.post('/create', createTable);

module.exports = router;
