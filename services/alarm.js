const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT a.id,b.status,a.alertno,a.created  FROM alert as a inner join alert_status as b on a.alertno=b.id  order by created desc'
  );
  const data = helper.emptyOrRows(rows);
  //const meta = {page};
  return data;
}
async function getMultiple_last10(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT a.id,b.status,a.alertno,a.created  FROM alert as a inner join alert_status as b on a.alertno=b.id where a.is_solve=0  order by a.created desc LIMIT 100 ' 
    
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}
async function getstatusalaram(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT b.status,count(a.alertno) as occored,(select count(alertno) from alert) as total  FROM alert as a inner join alert_status as b on a.alertno=b.id group by b.status'
    
  );
//  console.log(rows);
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}
async function create(tag){
    //validateCreate(tag);
    console.log(tag);
    const result = await db.query(
      'INSERT INTO alert (alertno) VALUES (?)', 
      [tag.alertno]
    );
  
    let message = 'Error in creating Tag';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag created successfully';
      type    = 2;
      //datafiled(tag);
    }
  
    return {message,type};
  }
  async function DeleteTag(id,tag){
    //validateCreate(tag);
  //  console.log(tag);
    const result = await db.query(
      `delete from  alert where id=?`,[id]);
    let message = 'Error in Tag Deleteing';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag Delete successfully';
      type    = 2;
    //  datafiled(tag);
    }
   // 
    return {message,type};
  }
  async function update(id){
    //validateCreate(tag);
    const result = await db.query(
      'update alert set is_solve=1 where id=?', 
      [id]
    );
  
    let message = 'Error in Updating Tag';
    let type    = 4;
    if (result.affectedRows) {
      message = 'Tag Updated successfully';
      type    = 2;
      //datafiled(tag);
    }
  
    return {message,type};
  }
  async function _delete(id, userParam) {
   
    const result = await db.query(
      `update  alert set is_solve=1 where id=?`,[id]);
    let message = 'Error in Tag Deleteing';
    let type    = 4;
    return {message,type};
}
  module.exports = {
    getMultiple,
    create,
    delete: _delete,
    getMultiple_last10,
    getstatusalaram,
    update
  }