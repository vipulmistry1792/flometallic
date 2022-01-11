const ShiftMaster = require('./services/shift_master.service');
var dateTime = require('node-datetime');
let batchdata=[];
let batchdata1=[];
let currenttime;
async function getrunningshift (){
    batchdata=[];
    batchdata1=[];
    batchdata1=[];
    batchdata=await ShiftMaster.getallshift().then();    
   var time3=dateTime.create(new Date());
   var shift=0;
   var formatted3 = time3.format('1904-01-01 H:M:S');
   var actualtime=new Date(formatted3).getTime();
   for (let index = 0; index < batchdata.length; index++) {
       const starttime = batchdata[index].starttime;
       const endtime = batchdata[index].endtime;
       var time1=dateTime.create(starttime);
       var time2=dateTime.create(endtime);
       var formatted1 = time1.format('1904-01-01 H:M:S');
       var formatted2 = time2.format('1904-01-01 H:M:S');       
       batchdata1.push({"Starttime":new Date(formatted1).getTime(),"EndTime":new Date(formatted2).getTime()})
       if(actualtime>= new Date(formatted1).getTime() && actualtime<= new Date(formatted2).getTime())
       {
           shift=index+1;
       }

   }
   if(shift==0)
   {
    shift=batchdata.length;
   }
   if(shift==1)
   {
    var time4=dateTime.create(new Date());
    currenttime=time4.format('Y-m-d 00:00:00');
   }
   else{
    var time4=dateTime.create(new Date());
    currenttime=time4.format('Y-m-d 00:00:00');
   }
   const sh=shift;
   const dt=currenttime;
  // console.log(sh+"--"+dt);
   return{sh,dt}
}
module.exports = {
    getrunningshift
};