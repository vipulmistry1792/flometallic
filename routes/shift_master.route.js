const express = require('express');
const router = express.Router();
const shift = require('../services/shift_master.service');
const runningshift = require('../shiftlogic');
/* GET tags listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await shift.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Meters `, err.message);
    next(err);
  }
});
router.get('/runningshift', async function(req, res, next) {
  try {
   // console.log(await runningshift.getrunningshift())
    res.json(await runningshift.getrunningshift());
  } catch (err) {
    console.error(`Error while getting Meters `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/', async function(req, res, next) {
  try {
    res.json(await shift.create(req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});

/* Add Edit Tag */
router.post('/Edit/:id', async function(req, res, next) {
  try {
    res.json(await shift.getShiftById(req.params.id,req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});
/*Update Meter */
router.post('/:id', async function(req, res, next) {
    try {
      res.json(await shift.update(req.params.id,req.body));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });
/*Delete  Meter */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await shift.delete_shift(req.params.id));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });
module.exports = router;
