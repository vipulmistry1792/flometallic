const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query('SELECT *   FROM batch_detail');
  const data = helper.emptyOrRows(rows);
  //const meta = {page};
  return data;
}
async function getlastbatchno(machineno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_detail where machineno=? order by created desc limit 2 ',[machineno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function getlastbatchnopin(pinno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_detail where pinno=? order by batchno desc limit 1 ',[pinno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function duplicatebatchcheck(machineno,batchno){
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_detail where machineno=? and batchno=?  ',[machineno,batchno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function machinewisebatch(emname){
    let machineno=emname.machineno;
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_detail where machineno=?',[machineno]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function datewisebatch(emname){
    let machineno=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_detail where machineno=? and created between ? and ?',[machineno,startdate,enddate]);
    const data = helper.emptyOrRows(rows);
    //const meta = {page};
    return data;
  }
  async function create(batch){
    //validateCreate(tag);
    const result = await db.query(
      'INSERT INTO batch_detail (machineno,pinno,batchno,batchstarttime,stdbatchtime,ton_kwh,kwh) VALUES (?, ?,?,?,?,?,?)', 
      [batch.machineno, batch.pinno,batch.batchno,batch.batchstarttime,batch.std_time,batch.ton_kwh,batch.set_kwh]);
    let message = 'Error in creating Batch';
    if (result.affectedRows) {
      message = 'Batch Created successfully';
    }
    return {message};
  }
  async function update(batch){
    let batchno=batch.batchno;
    const result = await db.query(
      'update  batch_detail set machineno=?,pinno=?,batchendtime=?,batchtime=? where batchno=? and machineno=?', 
      [batch.machineno, batch.pinno,batch.batchendtime,batch.batchtime,batchno,batch.machineno]);
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