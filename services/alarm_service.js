const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function getlastalarms()
{
    const rows = await db.query('SELECT a.id,b.status,a.alertno,a.created  FROM alert as a inner join alert_status as b on a.alertno=b.id where a.is_solve=0  order by a.created desc LIMIT 100 ');
      const data = rows;
      return rows;  
}
async function getstatusalaram(){
    const rows = await db.query('SELECT b.status,count(a.alertno) as occored  FROM alert as a inner join alert_status as b on a.alertno=b.id group by b.status');
    return rows;
  }
module.exports = {
    getlastalarms,
    getstatusalaram
  }