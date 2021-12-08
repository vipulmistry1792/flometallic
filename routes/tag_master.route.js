const express = require('express');
const router = express.Router();
const tags = require('../services/tag_master.service');

/* GET tags listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tags.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Tags `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/', async function(req, res, next) {
  //console.log(JSON.stringify(req.body));
  try {
    //res.json(req.body);
    res.json(await tags.create(req.body));
  } catch (err) {
    console.error(`Error while posting tags `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/up', async function(req, res, next) {
  //console.log(JSON.stringify(req.body));
  try {
    //res.json(req.body);
    res.json(await tags.update(req.body));
  } catch (err) {
    console.error(`Error while posting tags `, err.message);
    next(err);
  }
});
/* POST quotes */
router.post('/column', async function(req, res, next) {
  //console.log(req.body);
  try {
    //res.json(req.body);
    res.json(await tags.datafiled(req.body));
  } catch (err) {
    console.error(`Error while posting tags `, err.message);
    next(err);
  }
});
module.exports = router;
