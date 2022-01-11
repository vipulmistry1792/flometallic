const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');
const batch = require('../services/batch_detail.service');
const axios = require('axios');
const { json } = require('body-parser');
var statucode;
var meter_data         = [];
var batchdata          = [];
var idealdata          = [];
var upmeter_data         = [];
var upbatchdata          = [];
var upidealdata          = [];
var meterdata_insertquery    = `select id,shift,Sdate,DATE_FORMAT(created, '%Y-%m-%d %H:%m:%s') as created,modified,is_send,is_table,em1_Voltage,em1_batchno,em1_status,em1_current,em1_pf,em1_pin,em1_power,em1_kwhr,em2_Voltage,em2_batchno,em2_status,em2_pin,em2_current,em2_pf,em2_power,em2_kwhr,em3_Voltage,em3_batchno,em3_status,em3_pin,em3_current,em3_pf,em3_power,em3_kwhr,em4_Voltage,em4_batchno,em4_status,em4_pin,em4_current,em4_pf,em4_power,em4_kwhr,em5_Voltage,em5_batchno,em5_status,em5_pin,em5_current,em5_pf,em5_power,em5_kwhr,em6_Voltage,em6_batchno,em6_status,em6_pin,em6_current,em6_pf,em6_power,em6_kwhr,em7_Voltage,em7_batchno,em7_status,em7_pin,em7_current,em7_pf,em7_power,em7_kwhr from serial_data where is_send=0`;
var batchdata_insertquery    = `select id,pinno,batchno,machineno,DATE_FORMAT(batchstarttime, '%Y-%m-%d %H:%m:%s') as batchstarttime,DATE_FORMAT(batchendtime, '%Y-%m-%d %H:%m:%s') as batchendtime,is_active,is_send,DATE_FORMAT(created, '%Y-%m-%d %H:%m:%s') as created,updated,unique_batch,batchtime,stdbatchtime,ton_kwh,kwh,used_kwh from batch_detail where is_send=0`;
var idealdata_insertquery    = `select id,pinno,batchno,machineno,DATE_FORMAT(idealstarttime, '%Y-%m-%d %H:%m:%s') as idealstarttime,DATE_FORMAT(idealendtime, '%Y-%m-%d %H:%m:%s') as idealendtime,is_active,is_send,DATE_FORMAT(created, '%Y-%m-%d %H:%m:%s') as created,updated,unique_batch,batchtime,stdbatchtime,ton_kwh,kwh,used_kwh from ideal_detail where is_send=0`;
var batchdata_updatequery    = 'select * from batch_detail where is_update=0';
var idealdata_updatequery    = 'select * from ideal_detail where is_update=0';
const metersDatasendtoCloud     = async (query) => {
    meter_data         = [];
    meter_data = await batch.getcustomsdata(query);
   // await sleep(10);
}
const batchDatasendtoCloud      = async (query) => {
    batchdata          = [];
    batchdata=await batch.getcustomsdata(query);
   // await sleep(10);
}
const idealDatasendtoCloud     = async (query) => {
    idealdata          = [];
    idealdata = await batch.getcustomsdata(query);
   // await sleep(10);
}
const metersDataupdatesendtoCloud     = async (query) => {
    meter_data = await tags.getcustomsdata(query);
   // await sleep(10);
}
const batchDataupdatesendtoCloud      = async (query) => {
    batchdata=await batchruning.getcustomsdata(query);
   // await sleep(10);
}

const idealDataupdatesendtoCloud      = async (query) => {
    idealdata=await batchruning.getcustomsdata(query);
   // await sleep(10);
}
setInterval(intervalFunc,5000)
function intervalFunc() {
        metersDatasendtoCloud(meterdata_insertquery);
        batchDatasendtoCloud(batchdata_insertquery);
        idealDatasendtoCloud(idealdata_insertquery);
        if (meter_data.length>0)
        {
            meterdata_send(meter_data);
        }
        if (batchdata.length>0)
        {
          batch_datasend(batchdata);
        }
        if (idealdata.length>0)
        {
           // ideal_datasend(idealdata);
        }
}
const meterdata_updatedlocaldatabase      = async (id) => {
    //console.log(id)
    var meterdata_query_update    = `update serial_data set is_send=1 where  id<=${id}`;
    await batch.customquery(meterdata_query_update);
   // await sleep(10);
  }
function meterdata_send(data)
{
    var statuscode=0;
    var last_id=data.length;
for (let index = 0; index < data.length; index++) {
  const element = data[index].id;
  //console.log(element);
  if(index==(last_id))
  {    
    last_id=element;
  }
}

    axios
    .post(`http://localhost:3006/cloud`, data)
    .then(res => {
       // console.log(res)
      meterdata_updatedlocaldatabase(last_id)
    })
    .catch(error => {
      console.error(error)
    })
}
function batch_datasend(data)
{
    var last_id=data.length;
    // console.log(last_id);
      for (let index = 0; index < data.length; index++) {
      const element = data[index].id;
      //console.log(element);
      if(index==(last_id))
      {
        last_id=element;
         console.log(last_id);
      }
      }
    var statuscode=0;
    //console.log(data);
    axios
    .post(`http://localhost:3006/cloud/batch`, data)
    .then(res => {
      batchDetail_updatedlocaldatabase(last_id)
    })
    .catch(error => {
      console.error(error)
    })
} 
const batchDetail_updatedlocaldatabase      = async (id) => {
  //console.log(id)
  var meterdata_query_update    = `update batch_detail set is_send=1 where id<=${id}`;
  await batch.customquery(meterdata_query_update);
 // await sleep(10);
}  
function ideal_datasend(data)
{
    var last_id=data.length;
    // console.log(last_id);
      for (let index = 0; index < data.length; index++) {
      const element = data[index].id;
      //console.log(element);
      if(index==(last_id-1))
      {
        last_id=element;
        // console.log(last_id);
      }
      }
    var statuscode=0;
    //console.log(data);
    axios
    .post(`http://localhost:3006/cloud/ideal`, data)
    .then(res => {
      idealDetail_updatedlocaldatabase(last_id)
    })
    .catch(error => {
      console.error(error)
    })
} 
const idealDetail_updatedlocaldatabase      = async (id) => {
  //console.log(id)
  var meterdata_query_update    = `update ideal_detail set is_send=1 where  is_send=0 and id<=${id}`;
  await batch.customquery(meterdata_query_update);
 // await sleep(10);
} 