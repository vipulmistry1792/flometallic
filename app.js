const express = require('express');
const port=process.env.port || 3005;
const bodyParser   = require('body-parser');
const jwt          = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const path             = require('path');
const cors             = require('cors');
const batchdetailRouter = require('./routes/batch_detail.route');
const batchmasterRouter = require('./routes/batch_master.route');
const machinemasterRouter = require('./routes/meter_master.route');
const tagsRouter = require('./routes/tag_master.route');
const furnaceDashRouter = require('./routes/furnacedashboard.route');
const Batchinput = require('./batch_input');

const fs = require('fs');
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//set static folder 
app.use(express.static(path.join(__dirname, 'static')));
// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use('/users', require('./users/user.controller'));
//app.use('/users', require('./users/user.controller'));
app.use('/batchdetail', batchdetailRouter);
app.use('/batchmaster', batchmasterRouter);
app.use('/machine', machinemasterRouter);
app.use('/tags', tagsRouter);
app.use('/furnacedash', furnaceDashRouter);
app.listen(port, () => {
    console.log(`Server started on port`);
    //const Serial = require('./serial_data');
});
