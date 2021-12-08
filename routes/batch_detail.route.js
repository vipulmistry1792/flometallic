const express = require('express');
const router = express.Router();
const batchDetail = require('../services/batch_detail.service');
const batchinput = require('../batch_input');
/* GET tags listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await batchDetail.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Meters `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/', async function(req, res, next) {
  try {
    res.json(await batchDetail.create(req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/input', function(req, res, next) {
  try {
    console.log(req.body);
    res.json(batchinput.pollcb(req.body));
  } catch (err) {
    console.error(`Error while posting Meters `, err.message);
    next(err);
  }
});
/* Add New Tag */
router.post('/lastbatchno', async function(req, res, next) {
    try {
      res.json(await batchDetail.create(req.body));
    } catch (err) {
      console.error(`Error while posting Meters `, err.message);
      next(err);
    }
  });
/*Update Meter */
router.patch('/:id', async function(req, res, next) {
    try {
      res.json(await batchDetail.update(req.params.id,req.body));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });
/*Delete  Meter */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await batchDetail.delete_batch(req.params.id));
    } catch (err) {
      console.error(`Error while posting tags `, err.message);
      next(err);
    }
  });

module.exports = router;
