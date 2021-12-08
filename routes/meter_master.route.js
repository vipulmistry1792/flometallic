const express = require('express');
const router = express.Router();
const meters = require('../services/meter_master.service');

/* GET tags listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await meters.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Meters `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/', async function(req, res, next) {
  try {
    res.json(await meters.create(req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});
/* Add Edit Tag */
router.post('/Edit/:id', async function(req, res, next) {
  try {
    res.json(await meters.getMachineById(req.params.id,req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});
/*Update Meter */
router.post('/:id', async function(req, res, next) {
    try {
      res.json(await meters.update(req.params.id,req.body));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });
/*Delete  Meter */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await meters.delete_meter(req.params.id));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });
module.exports = router;
