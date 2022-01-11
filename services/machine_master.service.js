const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config = require('../helpers/config');
async function insert_data(datas){

  bulkInsert('serial_data_cloud', datas, (error, response) => {
    if (error) console.log(error);
    console.log(response);
  });
  }
  async function insert_data_batch(datas){
    bulkInsertbatch('batch_detail_cloud', datas, (error, response) => {
      if (error) console.log(error);
     // console.log(response);
    });
    }
    async function insert_data_ideal(datas){
        bulkInsert('ideal_detail', datas, (error, response) => {
          if (error) console.log(error);
         // console.log(response);
        });
        }
  function bulkInsert(table, objectArray, callback) {
     
    if(objectArray.length > 1){
    let keys = Object.keys(objectArray[0]);
    let values = objectArray.map( obj => keys.map( key =>obj[key]));
    //console.log(values)
    let query="";
    for (let index = 0; index < values[0].length; index++) {    
        query=query+'?,';
    }
    query = query.replace(/,\s*$/, "");
    let statement =`INSERT INTO ${table} (` + keys.join(',') + `) VALUES (${query})`;
        for (let index = 0; index < values.length; index++) {
                    db.query(statement, values[index], (err, results)=> {
                        if (err) {
                            //return res.send(err)
                        } else {
                            //return res.status(HttpStatus.OK).json({ message: 'ok', status: HttpStatus.OK })
                        }
                });    
        }
  }
  else{ }
  return { message: 'ok', status: 'ok' }
  }
  function bulkInsertbatch(table, objectArray, callback) {
     
    if(objectArray.length > 1){
    let keys = Object.keys(objectArray[0]);
    let values = objectArray.map( obj => keys.map( key =>obj[key]));
    //console.log(values)
    let query="";
    for (let index = 0; index < values[0].length; index++) {    
        query=query+'?,';
    }
    query = query.replace(/,\s*$/, "");
    let statement =`INSERT INTO ${table} (` + keys.join(',') + `) VALUES (${query})`;
        for (let index = 0; index < values.length; index++) {
                    db.query(statement, values[index], (err, results)=> {
                        if (err) {
                            //return res.send(err)
                        } else {
                            //return res.status(HttpStatus.OK).json({ message: 'ok', status: HttpStatus.OK })
                        }
                });    
        }
  }
  else{ }
  return { message: 'ok', status: 'ok' }
  }
  module.exports = {
    insert_data,
    insert_data_batch,
    insert_data_ideal
  }