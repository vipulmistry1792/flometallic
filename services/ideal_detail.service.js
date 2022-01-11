const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query('SELECT *   FROM ideal_detail');
  const data = helper.emptyOrRows(rows);
  //const meta = {page};
  return data;
}
async function getlastbatchno(machineno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM ideal_detail where machineno=? order by created desc limit 1 ',[machineno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function getlastbatchnopin(pinno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM ideal_detail where pinno=? order by batchno desc limit 1 ',[pinno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function duplicatebatchcheck(machineno,batchno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM ideal_detail where machineno=? and batchno=?  ',[machineno,batchno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function machinewisebatch(emname){
    let machineno=emname.machineno;
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM ideal_detail where machineno=?',[machineno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function datewisebatch(emname){
    let machineno=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM ideal_detail where machineno=? and created between ? and ?',[machineno,startdate,enddate]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function create(batch){
    //validateCreate(tag);
    const result = await db.query(
      'INSERT INTO ideal_detail (machineno,pinno,idealstarttime,stdbatchtime,ton_kwh,kwh) VALUES (?, ?,?,?,?,?)', 
      [batch.machineno, batch.pinno,batch.batchstarttime,batch.std_time,batch.ton_kwh,batch.set_kwh]);
    let message = 'Error in creating Batch';
    if (result.affectedRows) {
      message = 'Batch Created successfully';
    }
    return {message};
  }
  async function update(batch){
    let machineno=batch.machineno;
    let friendly_name=batch.friendly_name;
    //console.log(`SELECT * FROM ideal_detail where machineno=${machineno} and idealendtime IS NULL order by created desc`);
    const rows = await db.query(`SELECT * FROM ideal_detail where machineno=? and idealendtime IS NULL order by created desc limit 1`,[machineno]);
    const data = helper.emptyOrRows(rows);
    let id=data[0].id;
    let starttime=data[0].idealstarttime;
    let endtime=batch.batchstarttime;
    let result;
    let result1;
    let energy;
    if(data.length>0)
    {
      result1 = await db.query(`select (max(${friendly_name}_kwhr)-min(${friendly_name}_kwhr)) as used_energy from serial_data where created between ? and ? `,[starttime,endtime]);
      const data1 = helper.emptyOrRows(result1);
      if(data1.length>0)
      {
        energy=data1[0].used_energy;
      }
      else
      {
        energy=0;
      }   
        //console.log("Present");
       // console.log(`update  ideal_detail set pinno=${batch.pinno},idealendtime='${batch.batchstarttime}',batchtime=${batch.batchtime} where machineno=${batch.machineno} and id=${id}`);
        result = await db.query(
            `update  ideal_detail set pinno=?,idealendtime=?,batchtime=?,used_kwh=? where machineno=? and id=?`, 
            [batch.pinno,batch.batchstarttime,batch.batchtime,energy,batch.machineno,id]);
    }
    else
    {
        result =""
    }

    let message = 'Error in update Batch';
    if (result.affectedRows) {
      message = 'Batch update successfully';
    }
    return {message};
  }
  async function delete_batch(batch){
    //validateCreate(tag);
    const result = await db.query('delete  batch_detail  where batchno=? and machineno=?', [batch.machineno,batch.batchno]);
    let message = 'Error in Delete Batch';
    if (result.affectedRows) {
      message = 'Batch Delete successfully';
    }
    return {message};
  }
  module.exports = {
    getMultiple,
    getlastbatchno,
    create,
    update,
    delete_batch,
    getlastbatchnopin,
    duplicatebatchcheck,
    machinewisebatch,
    datewisebatch
  }  