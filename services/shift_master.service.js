const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');
var dateTime = require('node-datetime');
async function getMultiple(page = 1){
  const rows = await db.query('SELECT *   FROM shift_master where is_active=0');
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getallshift(){
  const rows = await db.query('SELECT *   FROM shift_master where is_active=0');
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getShiftById(id,meter){
  const rows = await db.query('SELECT *   FROM shift_master where id=?',[id]);
  const data = helper.emptyOrRows(rows);
  return data;
}
  async function create(shift){
    var dt = dateTime.create(shift.starttime);
    var start_time = dt.format('H:M:S');
    var dt1 =dateTime.create(shift.endtime);
    var end_time = dt1.format('H:M:S');
    const result = await db.query(
      'INSERT INTO shift_master (shiftno,starttime,endtime,shifttime,is_active) VALUES (?, ?,?,?,0)', 
      [shift.shiftno, shift.starttime,shift.endtime,shift.shifttime]);
    let message = 'Error in creating Meter';
    if (result.affectedRows) {
      message = 'Meter Created successfully';
    }
    return {message};
  }
  async function update(id,shift){
    var dt = dateTime.create(shift.starttime);
    var start_time = dt.format('H:M:S');
    var dt1 =dateTime.create(shift.endtime);
    var end_time = dt1.format('H:M:S');
    const result = await db.query(
      'update  shift_master set shiftno=?,starttime=?,endtime=?,shifttime=? where id=?', 
      [shift.shiftno, shift.starttime,shift.endtime,shift.shifttime,id]);
    let message = 'Error in update Meter';
    if (result.affectedRows) {
      message = 'Meter update successfully';
    }
    return {message};
  }
async function delete_shift(id)
{
  const result = await db.query('delete from shift_master where id=?', [id]);
  let message = 'Error in Delete Meter';
  if (result.affectedRows) {
    message = 'Meter Delete successfully';
  }
  return {message};
}
  module.exports = {
    getMultiple,
    getallshift,
    create,
    update,
    delete_shift,
    getShiftById
  }  