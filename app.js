const express = require('express');
const port=process.env.port || 3005;
const Env_type=process.env.ENV_TYPE || 'local';
const readdata=process.env.readdata || 0;
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
const shiftRouter = require('./routes/shift_master.route');
const Batchinput = require('./batch_input');
const cloud_DataRouter    = require('./routes/meter_cloud_data.route');

const fs = require('fs');
const app=express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
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
app.use('/cloud', cloud_DataRouter);
app.use('/shift', shiftRouter);
const SendDatatoCloud     = require('./services/cloulddatasend.service');
app.listen(port, () => {
    console.log(`Server started on port`);
    //
    if(Env_type=="local" && readdata==1)
    {
        const Serial = require('./serial_data');
    }
});
