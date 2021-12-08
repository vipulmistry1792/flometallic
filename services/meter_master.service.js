const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');
async function getMultiple(page = 1){
  const rows = await db.query('SELECT *   FROM machine_master');
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getmeterusingpinno(pinno){
  const rows = await db.query('SELECT *   FROM machine_master where pinno=?',[pinno]);
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getallmeters(){
  const rows = await db.query('SELECT *   FROM machine_master');
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getMachineById(id,meter){
  const rows = await db.query('SELECT *   FROM machine_master where id=?',[id]);
  const data = helper.emptyOrRows(rows);
  return data;
}
  async function create(meter){
    const result = await db.query(
      'INSERT INTO machine_master (machineno,pinno,machine_name,friendly_name) VALUES (?, ?,?,?)', 
      [meter.machineno, meter.pinno,meter.machine_name,meter.friendly_name]);
    let message = 'Error in creating Meter';
    if (result.affectedRows) {
      message = 'Meter Created successfully';
    }
    return {message};
  }
  async function update(id,meter){
    const result = await db.query(
      'update  machine_master set machineno=?,pinno=?,machine_name=?,friendly_name=? where id=?', 
      [meter.machineno, meter.pinno,meter.machine_name,meter.friendly_name,id]);
    let message = 'Error in update Meter';
    if (result.affectedRows) {
      message = 'Meter update successfully';
    }
    return {message};
  }
async function delete_meter(id)
{
  const result = await db.query('delete from machine_master where id=?', [id]);
  let message = 'Error in Delete Meter';
  if (result.affectedRows) {
    message = 'Meter Delete successfully';
  }
  return {message};
}
  module.exports = {
    getMultiple,
    getallmeters,
    create,
    update,
    delete_meter,
    getmeterusingpinno,
    getMachineById
  }  