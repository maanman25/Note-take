// Importing express to access Router method
const router = require('express').Router();
// Importing api and html (routes) modules
const api = require('./api');
const html = require('./html');

// use router method to route into the correct file dependent on the users search params
router.use('/api', api);
router.use('/', html);


module.exports = router;