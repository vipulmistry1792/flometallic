const ShiftMaster = require('./services/shift_master.service');
console.log(new Date().toTimeString());

let batchdata=[];
const shift      = async () => {
    return await ShiftMaster.getallshift();
    //await sleep(10);
}
shift().then(
    response =>{
        for (let index = 0; index < response.length; index++) {
            const element = response[index].starttime;
            const element1 = response[index].endtime;
            batchdata.push({"starttime":element,"endtime":element1})           
        }
    console.log(batchdata);

  }
  )
  .finally(   
    
  );