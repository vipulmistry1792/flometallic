const express = require('express');
const router = express.Router();
const furnacedash = require('../services/furnacedashboard');
const batchdetail = require('../services/batch_detail.service');
/* GET tags listing. */
router.get('/energy', async function(req, res, next) {
  try {
    //  console.log(req);
    res.json(await furnacedash.EnergyData(req.query));
  } catch (err) {
    console.error(`Error while getting Meters `, err.message);
    next(err);
  }
});
/* GET tags listing. */
router.get('/time', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await furnacedash.TimeData(req.query));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/history', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await furnacedash.meterhistory(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/batchdata', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await furnacedash.EnergyBatchData(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/machinebatch', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await batchdetail.machinewisebatch(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/datewisebatch', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await batchdetail.datewisebatch(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/getbatch', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await furnacedash.batchnomachinewise(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
  router.post('/getbatchdetail', async function(req, res, next) {
    try {
       // console.log(req);
      res.json(await furnacedash.batchdetailmeterwise(req.body));
    } catch (err) {
      console.error(`Error while getting Meters `, err.message);
      next(err);
    }
  });
module.exports = router;
