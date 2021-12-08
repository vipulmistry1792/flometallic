const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT bm.id,mm.machine_name as machineno,bm.batchno,bm.stdbatchtime,bm.kwh,bm.ton_kwh,bm.created,bm.updated as modified,bm.upr_limit as UpperLimit,bm.mdl_limit as MiddleLimit,bm.lwr_limit as LowerLimit,bm.pinno,bm.status,bm.friendly_name,bm.running_batchno   FROM batch_master as bm inner join machine_master as mm on bm.machineno=mm.machineno'
  );
  const data = helper.emptyOrRows(rows);
  //const meta = {page};
  return data;
}
async function getBatchById(id,batch){
  const rows = await db.query('SELECT  *  FROM batch_master where id=?',[id]);
  const data = helper.emptyOrRows(rows);
  return data;
}
async function create(batch){
    //validateCreate(tag);
    const result = await db.query(
      'INSERT INTO batch_master (machineno,batchno,stdbatchtime,ton_kwh,kwh,upr_limit,mdl_limit,lwr_limit) VALUES (?, ?, ?, ?,?,?,?,?)', 
      [batch.machineno,batch.batchno,batch.batchtime,batch.kwh_ton,batch.kwh,batch.upr_limit,batch.mdl_limit,batch.lwr_limit]
    );
    let message = 'Error in creating Tag';
    if (result.affectedRows) {
      message = 'Tag created successfully';
    }
    return {message};
  }
  async function update(id,batch){
    //validateCreate(tag);
    
    //let batchno=batch.batchno;
    const result = await db.query(
      'update  batch_master set machineno=?,batchno=?,stdbatchtime=?,ton_kwh=?,kwh=? where id=?', 
      [batch.machineno,batch.batchno,batch.batchtime,batch.kwh_ton,batch.kwh,id]);
      const rows = await db.query('SELECT  *  FROM batch_master where id=?',[id]);
      const data = helper.emptyOrRows(rows);
      let batchno=data[0]['running_batchno'];
     // console.log(batchno);
      const result1 = await db.query(
        `update  batch_detail set stdbatchtime=?,ton_kwh=?,kwh=? where machineno=? and batchno='${batchno}'`, 
        [batch.batchtime,batch.kwh_ton,batch.kwh,batch.machineno]);
    let message = 'Error in update Batch';
    if (result.affectedRows) {
      message = 'Batch update successfully';
    }
    return {message};
  }
  async function updaterunningbatch(batch){
    //validateCreate(tag);
    //console.log(batch);
    let batchno=batch.batchno;
    const result = await db.query(
      'update  batch_master set running_batchno=?,status=?,pinno=?,friendly_name=? where machineno=?', 
      [batch.batchno,batch.status,batch.pinno,batch.friendly_name,batch.machineno]);
    let message = 'Error in update Batch';
    if (result.affectedRows) {
      message = 'Batch update successfully';
    }
    return {message};
  }
  async function nextbatchno(machineno,batchno){
    //validateCreate(tag);
   // console.log(batch);
   // let batchno=batch.batchno;
    const result = await db.query(
      'update  batch_master set batchno=? where machineno=?', 
      [batchno,machineno]);
    let message = 'Error in update Batch';
    if (result.affectedRows) {
      message = 'Batch update successfully';
    }
    return {message};
  }
  async function delete_batch(id){
    //validateCreate(tag);
    const result = await db.query('delete from  batch_master  where id=?', [id]);
    let message = 'Error in Delete Batch';
    if (result.affectedRows) {
      message = 'Batch Delete successfully';
    }
    return {message};
  }
  async function getlastbatchnopin(machineno){
    
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT * FROM batch_master where machineno=? ',[machineno]);
   // const query =`SELECT * FROM batch_master where machineno=${machineno}`
   // console.log(query)
    const data = helper.emptyOrRows(rows);
   //const data=[];
    //const meta = {page};
    return data;
  }
  module.exports = {
    getMultiple,
    create,
    update,
    delete_batch,
    getBatchById,
    getlastbatchnopin,
    nextbatchno,
    updaterunningbatch
  }