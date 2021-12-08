const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');

async function EnergyData(emname){
    //console.log(emname);
    //const offset = helper.getOffset(page, config.listPerPage);
    let emn=emname.emname;
    let batch=emname.batchno;
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${emn}%'`);
    let mcno=rows1[0].machineno;
    const rows2 = await db.query(`select * from batch_master where friendly_name like '${emn}%'`);
    let runningbatch=rows2[0].running_batchno;
    const rows3 = await db.query(`select * from batch_detail where machineno=${mcno}`);
    let endtime=new Date(rows3[0].batchendtime).toISOString();
    let data_a;
    if(runningbatch=="")
    {
     // console.log(`select ifnull(mm.machine_name,'') as machine_name,ifnull(a.${emn}_batchno,'') as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.created <= '${endtime}'`);
      data_a = await db.query(
        `select ifnull(mm.machine_name,'') as machine_name,'' as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.created >= '${endtime}'`
       );
    }
    else
    {
       data_a = await db.query(
        `select ifnull(mm.machine_name,'') as machine_name,ifnull(a.${emn}_batchno,'') as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.${emn}_batchno like '${batch}%'`
       );
    }

  //   const data = helper.emptyOrRows(data_a);
  // //  console.log(`select mm.machine_name,a.${emn}_batchno,a.${emn}_status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.${emn}_batchno like '${batch}%'`)
  //   const rows = await db.query(
  //     `select ifnull(mm.machine_name,'') as machine_name,ifnull(a.${emn}_batchno,'') as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.${emn}_batchno like '${batch}%'`
  //   );
    const data = helper.emptyOrRows(data_a);
    //const meta = {page};
    return data;
  }
  async function EnergyBatchData(emname){
    //console.log(emname);
    //const offset = helper.getOffset(page, config.listPerPage);
    let emn=emname.emname;
    let batch=emname.batchno;
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${emn}%'`);
    let mcno=rows1[0].machineno;
    const rows2 = await db.query(`select * from batch_master where friendly_name like '${emn}%'`);
    let runningbatch=rows2[0].running_batchno;
    const rows3 = await db.query(`select * from batch_detail where machineno=${mcno} and batchno='${batch}'`);
    let startdate=new Date(rows3[0].batchstarttime).toISOString();
    let enddate;
    if(rows3[0].batchstarttime=="NULL")
    {
      enddate=new Date().toISOString();
    }
    else
    {
     enddate=new Date(rows3[0].batchendtime).toISOString();
    }
   // let enddate=emname.end_date;
    //let endtime=new Date(rows3[0].batchendtime).toISOString();
    let data_a;
    if(runningbatch=="")
    {
     // console.log(`select ifnull(mm.machine_name,'') as machine_name,ifnull(a.${emn}_batchno,'') as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.created <= '${endtime}'`);
      data_a = await db.query(
        `select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where created between '${startdate}' and '${enddate}'`
       );
    }
    else
    {
       data_a = await db.query(
        `select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where created between '${startdate}' and '${enddate}'`
       );
    }

  //   const data = helper.emptyOrRows(data_a);
  // //  console.log(`select mm.machine_name,a.${emn}_batchno,a.${emn}_status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.${emn}_batchno like '${batch}%'`)
  //   const rows = await db.query(
  //     `select ifnull(mm.machine_name,'') as machine_name,ifnull(a.${emn}_batchno,'') as batchno,ifnull(a.${emn}_status,'') as status,ifNULL(max(${emn}_kwhr)-min(${emn}_kwhr),0) as energy from  serial_data as a inner join machine_master as mm on a.${emn}_pin=mm.pinno where a.${emn}_batchno like '${batch}%'`
  //   );
    const data = helper.emptyOrRows(data_a);
    //const meta = {page};
    return data;
  }

  async function TimeData(emname){
    
    let emn=emname.emname;
   // console.log(`select * from machine_master where friendly_name like '${emn}%'`)
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${emn}%'`);
    let mcno=rows1[0].machineno;
    const rows2 = await db.query(`select * from batch_master where friendly_name like '${emn}%'`);
    let runningbatch=rows2[0].running_batchno;
    let data_a;
    if(runningbatch=="")
    {
    //  console.log(`select mm.machine_name,if(a.batchendtime=NULL,'',a.batchno) as batchno,a.batchendtime as batchstarttime,a.stdbatchtime,a.ton_kwh,a.kwh,ROUND(time_to_sec((TIMEDIFF(NOW(), a.batchendtime))) / 60) as running_time from  batch_detail as a inner join machine_master as mm on a.machineno=mm.machineno where a.batchno=(select  batchno from batch_detail where machineno=${mcno} order by created desc limit 1)`);
      data_a = await db.query(
        `select mm.machine_name,if(a.batchendtime=NULL,a.batchno,'Ideal') as batchno,a.batchendtime as batchstarttime,a.stdbatchtime,a.ton_kwh,a.kwh,ROUND(time_to_sec((TIMEDIFF(NOW(), a.batchendtime))) / 60) as running_time from  batch_detail as a inner join machine_master as mm on a.machineno=mm.machineno where a.batchno=(select  batchno from batch_detail where machineno=${mcno} order by created desc limit 1)`
       );
    }
    else
    {
       data_a = await db.query(
        `select mm.machine_name,a.batchno,a.batchstarttime,a.stdbatchtime,a.ton_kwh,a.kwh,ROUND(time_to_sec((TIMEDIFF(NOW(), a.batchstarttime))) / 60) as running_time from  batch_detail as a inner join machine_master as mm on a.machineno=mm.machineno where a.batchno=(select  batchno from batch_detail where machineno=${mcno} order by created desc limit 1)`
       );
    }

    const data = helper.emptyOrRows(data_a);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  async function meterhistory(emname){
    
    let emn=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    const rows = await db.query(
     `select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where created between '${startdate}' and '${enddate}'`
    );
    const data = helper.emptyOrRows(rows);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  async function batchnomachinewise(emname){
    
    let emn=emname.machineno;
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${emn}%'`);
    console.log(rows1)
    let mcno=rows1[0].machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    let query=""
    if(startdate=='' && enddate=='')
    {
      query= `select * from batch_detail where machineno=${mcno}`
    }
    else
    {
      query=`select * from batch_detail where machineno=${mcno} and created between '${startdate}' and '${enddate}'`
    }
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  async function batchdetailmeterwise(emname){
    
    let emn=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${emn}%'`);
    let machineno=rows1[0].machineno;
    let batchno=emname.batchno;
    let query=""
    let query1=""
    if(startdate=='' && enddate=='')
    {
      query= `select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where ${emn}_batchno='${batchno}'`
      query1= `select * from batch_detail where machineno=${machineno} and batchno='${batchno}'`
    }
    else
    {
      //query=`select * from batch_detail where machineno=${emn} and created between '${startdate}' and '${enddate}'`
    }
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    const rows2 = await db.query(query1);
    const data1 = helper.emptyOrRows(rows2);
   // console.log(rows)
    //const meta = {page};
    return {
      data,
      data1
    };
  }
  async function energyupdate(emname){
    
    let emn=emname.friendly_name;
    let batchno=emname.batchno;
    let rows=[]
    if(batchno != ''  || batchno != 'NULL'){
      console.log(`update batch_detail set used_kwh=(select ifnull(max(${emn}_kwhr)-min(${emn}_kwhr),0) from serial_data where ${emn}_batchno ='${batchno}') where batchno='${batchno}'`);
      rows = await db.query(
        `update batch_detail set used_kwh=(select ifnull(max(${emn}_kwhr)-min(${emn}_kwhr),0) from serial_data where ${emn}_batchno ='${batchno}') where batchno='${batchno}'`
       );
    }

    const data = helper.emptyOrRows(rows);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  module.exports = {
    TimeData,
    EnergyData,
    meterhistory,
    EnergyBatchData,
    energyupdate,
    batchdetailmeterwise,
    batchnomachinewise,
  }