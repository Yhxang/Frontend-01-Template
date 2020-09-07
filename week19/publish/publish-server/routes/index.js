var express = require('express');
var router = express.Router();
const fs = require('fs');
const { brotliDecompressSync } = require('zlib');

/* GET home page. */
router.post('/', function(req, res, next) {
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content)
  
  //res.render('index', { title: 'Express' });
  res.send('');
  res.end();
});

module.exports = router;
