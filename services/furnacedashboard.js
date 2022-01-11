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
   // console.log(`select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where created between '${startdate}' and '${enddate}'`)
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
    //console.log(rows1)
    let mcno=rows1[0].machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    let query=""
    if(startdate=='' && enddate=='')
    {
      query= `select * from batch_detail where machineno=${mcno} order by created desc` 
    }
    else
    {
      query=`select * from batch_detail where machineno=${mcno} and created between '${startdate}' and '${enddate}' order by created desc`
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
    let data;
    let data1;
    if(startdate=='' && enddate=='')
    {
      query= `select created as timestamp,${emn}_Voltage as Voltage,${emn}_batchno as batchno,${emn}_current as Current ,${emn}_pf as Pf,${emn}_kwhr as Kwhr,${emn}_power as Power from serial_data where ${emn}_batchno='${batchno}'`
      query1= `select * from batch_detail where machineno=${machineno} and batchno='${batchno}'`
    }
    else
    {
      query1=`select * from batch_detail where machineno=${machineno} and created between '${startdate}' and '${enddate}'`
      //query=`select * from batch_detail where machineno=${emn} and created between '${startdate}' and '${enddate}'`
    }

    if(startdate=='' && enddate=='')
    {
      const rows = await db.query(query);
      data = helper.emptyOrRows(rows);
    }
    else
    {
      data =[];
    }
   // console.log(query1)
    const rows2 = await db.query(query1);
    data1 = helper.emptyOrRows(rows2);
   // console.log(rows)
    //const meta = {page};
    return {
      data,
      data1
    };
  }
  async function Shiftdata(emname){
    
    let emn=emname.emname;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    const rows1  = await db.query(`select ifnull(count(DISTINCT(${emn}_batchno)),0) as runnigshiftbatch from serial_data where Sdate between '${startdate}' and '${enddate}' and shift=${emname.shift}`);
    const rows4  = await db.query(`select ifnull(count(DISTINCT(${emn}_batchno)),0) as Todaytotalbatch from serial_data where Sdate between '${startdate}' and '${enddate}'`);
    let query=""
    let query1=""
    let data;
    let data1;
    let data2;
    let data3;
    data = helper.emptyOrRows(rows1);
    data2 = helper.emptyOrRows(rows4);
    query= `select ifnull((max(${emn}_kwhr)-min(${emn}_kwhr)),0) as shiftKwhr from serial_data where Sdate between '${startdate}' and '${enddate}' and shift=${emname.shift}`
  
    const rows2 = await db.query(query);
    data1 = helper.emptyOrRows(rows2);
    query1= `select ifnull((max(${emn}_kwhr)-min(${emn}_kwhr)),0) as todayKwhr from serial_data where Sdate between '${startdate}' and '${enddate}'`
    const rows3 = await db.query(query1);
    data3 = helper.emptyOrRows(rows3);
  // console.log(data)
  // console.log(data1)
   //console.log(data3)
    return {
      data,
      data1,
      data2,
      data3
    };
  }
  async function energyupdate(emname){
    
    let emn=emname.friendly_name;
    let batchno=emname.batchno;
    let rows=[]
    if(batchno != ''  || batchno != 'NULL'){
    //  console.log(`update batch_detail set used_kwh=(select ifnull(max(${emn}_kwhr)-min(${emn}_kwhr),0) from serial_data where ${emn}_batchno ='${batchno}') where batchno='${batchno}'`);
      rows = await db.query(
        `update batch_detail set used_kwh=(select ifnull(max(${emn}_kwhr)-min(${emn}_kwhr),0) from serial_data where ${emn}_batchno ='${batchno}') where batchno='${batchno}'`
       );
    }

    const data = helper.emptyOrRows(rows);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  async function energyconsuption(emname){
    let machineno=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    let rows=[]
    if(machineno == 'All'){
      
      rows = await db.query(`select date(created)  as Date,ifnull(max(em1_kwhr)-min(em1_kwhr),0) as energy,ifnull(max(em2_kwhr)-min(em2_kwhr),0) as energy1,ifnull(max(em3_kwhr)-min(em3_kwhr),0) as energy2,ifnull(max(em4_kwhr)-min(em4_kwhr),0) as energy3,ifnull(max(em5_kwhr)-min(em5_kwhr),0) as energy4,ifnull(max(em6_kwhr)-min(em6_kwhr),0) as energy5,ifnull(max(em7_kwhr)-min(em7_kwhr),0) as energy6 from serial_data where  created between '${startdate}' and '${enddate}' group by date(created)`);
    }
    else
    {
      rows = await db.query(`select date(created)  as Date,ifnull(max(${machineno}_kwhr)-min(${machineno}_kwhr),0) as energy from serial_data where created between '${startdate}' and '${enddate}' group by date(created)`);
    }

    const data = helper.emptyOrRows(rows);
   // console.log(rows)
    //const meta = {page};
    return data;
  }
  async function energyconsuptionhourly(emname){
    let machineno=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    let rows=[]
    if(machineno == 'All'){
      
      rows = await db.query(`select  DATE_FORMAT(created, '%Y-%m-%d %H:00:00') as Date,ifnull(max(em1_kwhr)-min(em1_kwhr),0) as energy,ifnull(max(em2_kwhr)-min(em2_kwhr),0) as energy1,ifnull(max(em3_kwhr)-min(em3_kwhr),0) as energy2 from serial_data where  created between DATE_FORMAT('${startdate}', '%Y-%m-%d %H:00:00') and DATE_FORMAT('${enddate}', '%Y-%m-%d %H:00:00') group by DATE_FORMAT(created, '%Y-%m-%d %H:00:00')`);
    }
    else
    {
      rows = await db.query(`select  DATE_FORMAT(created, '%Y-%m-%d %H:00:00') as Date,ifnull(max(${machineno}_kwhr)-min(${machineno}_kwhr),0) as energy from serial_data where  created between DATE_FORMAT('${startdate}', '%Y-%m-%d %H:%i:00') and DATE_FORMAT('${enddate}', '%Y-%m-%d %H:%i:00') group by DATE_FORMAT(created, '%Y-%m-%d %H:00:00')`);
    }

    const data = helper.emptyOrRows(rows);
  // console.log(`select  DATE_FORMAT(created, '%Y-%m-%d %H:%i:00') as Date,ifnull(max(em1_kwhr)-min(em1_kwhr),0) as energy,ifnull(max(em2_kwhr)-min(em2_kwhr),0) as energy1,ifnull(max(em3_kwhr)-min(em3_kwhr),0) as energy2,ifnull(max(em4_kwhr)-min(em4_kwhr),0) as energy3,ifnull(max(em5_kwhr)-min(em5_kwhr),0) as energy4,ifnull(max(em6_kwhr)-min(em6_kwhr),0) as energy5,ifnull(max(em7_kwhr)-min(em7_kwhr),0) as energy6 from serial_data where  created between DATE_FORMAT('${startdate}', '%Y-%m-%d %H:%i:00') and DATE_FORMAT('${enddate}', '%Y-%m-%d %H:%i:00') group by DATE_FORMAT(created, '%Y-%m-%d %H:%i:00')`)
    //const meta = {page};
    return data;
  }
  async function onlineData(emname){
    let rows=[]
      rows = await db.query(`select * from serial_data order by created desc limit 1`);
    const data = helper.emptyOrRows(rows);
  // console.log(`select  DATE_FORMAT(created, '%Y-%m-%d %H:%i:00') as Date,ifnull(max(em1_kwhr)-min(em1_kwhr),0) as energy,ifnull(max(em2_kwhr)-min(em2_kwhr),0) as energy1,ifnull(max(em3_kwhr)-min(em3_kwhr),0) as energy2,ifnull(max(em4_kwhr)-min(em4_kwhr),0) as energy3,ifnull(max(em5_kwhr)-min(em5_kwhr),0) as energy4,ifnull(max(em6_kwhr)-min(em6_kwhr),0) as energy5,ifnull(max(em7_kwhr)-min(em7_kwhr),0) as energy6 from serial_data where  created between DATE_FORMAT('${startdate}', '%Y-%m-%d %H:%i:00') and DATE_FORMAT('${enddate}', '%Y-%m-%d %H:%i:00') group by DATE_FORMAT(created, '%Y-%m-%d %H:%i:00')`)
    //const meta = {page};
    return data;
  }
  async function idealenergyused(emname){
    let machineno=emname.emname;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    const rows1 = await db.query(`select * from machine_master where friendly_name like '${machineno}%'`);
    let mcno=rows1[0].machineno;
    let rows=[]
    //console.log(`select DATE_FORMAT(created, '%Y-%m-%d') as Date,ifnull(sum(used_kwh),0) used_energy,ifnull(sum(batchtime),0) as batchtime from ideal_detail where created between '${startdate}' and '${enddate}' and machineno=${mcno} group by DATE_FORMAT(created, '%Y-%m-%d')`);
      rows = await db.query(`select ifnull(sum(used_kwh),0) used_energy,ifnull(sum(batchtime),0) as batchtime from ideal_detail where created between '${startdate}' and '${enddate}' and machineno=${mcno}`);
    const data = helper.emptyOrRows(rows);
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
    energyconsuption,
    energyconsuptionhourly,
    onlineData,
    Shiftdata,
    idealenergyused
  }