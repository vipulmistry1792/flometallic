const ModbusRTU = require("modbus-serial");
// create an empty modbus client
const client    = new ModbusRTU();
const async = require('async');
const tags      = require('./services/tags');
const meters = require('./services/meter_master.service');
const batchMasterService = require('./services/batch_master.service');
const runningshiftService = require('../shiftlogic');
var finalans = [];
let tables_chk
var meter_d=[];
var meter_master=[];
var batchmaster=[];
var shiftdetail=[];
client.connectRTUBuffered("COM3", {
   baudRate: 9600,
   parity: "even",
   dataBits: 8,
   stopBits: 1
});
// set timeout, if slave did not reply back
client.setTimeout(1000);
var converted_data = [];
var finalans = [];
opcua_data="CREATE TABLE `serial_data` (`id` int(11) NOT NULL AUTO_INCREMENT,shift int(11),Sdate varchar(255) DEFAULT NULL,`created` timestamp NULL DEFAULT current_timestamp(),`modified` varchar(255) DEFAULT NULL,`is_send` int(11) DEFAULT 0,`is_table` int(11) DEFAULT 0,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"; 
tablecheck="SHOW TABLES LIKE '%serial_data%'"; 
const Tags      = async () => {
    meter_d=await tags.getRTUTags(prototype = "Modbus RTU");
    //await sleep(10);
}
const metermasterdata      = async () => {
   meter_master=await meters.getallmeters();
   //await sleep(10);
}
const getallbatchdata      = async () => {
   batchmaster=await batchMasterService.getMultiple(1);
   //await sleep(10);
}
const insert_data      = async (query) => {
    //insert_data_tags("")
    await tags.insert_data(query);
   // await sleep(10);
}
const insert_data_tags      = async (query) => {
    await tags.insert_data_tags(query);
   // await sleep(10);
}
const customdata_query      = async (query) => {
    await tags.getdata(query);
   // await sleep(10);
}
const runningshift      = async () => {
   shiftdetail=await runningshiftService.runningshift();
  // await sleep(10);
}
async function exTest(query){
    return await tags.getdata(query);
}
const getMetersValue = async (meters) => {
   try {	
       var json_d='{';	
       let conval=0;
       let loop1=0;
      // console.log(meters.data);
       meters=meters; 
       console.log(`${new Date()}===================Start================`);     
       for (let index = 0; index < meters.length; index++) {
           // console.log(meters[index].start_add);
            let start_address = meters[index].start_address;
            let qty           = meters[index].qty;
            let device_id     = meters[index].device_id;
            let tag_name      = meters[index].tag_name;
            let type          = meters[index].tag_type;
            let device_name   = meters[index].device_name;
            let modfunction   = meters[index].dataread_type;
            let data_type   = meters[index].data_type;
            //console.log(modfunction);
            if(index==0)
            {
                finalans=[];
            }
            // output value to console
           //  await getMeterValue(device_id,start_address,qty,type,tag_name,device_name,modfunction);
           let ans=0;
           if(modfunction==1)
           {
              //console.log("Read Coil Start");
              ans=await getMeterValuecoil(device_id,start_address,qty,type,tag_name,device_name,modfunction);
               finalans.push(ans.data);
              // console.log("Read Coil Finish");
           }
           else if (modfunction==2)
           {
              ans= await getMeterValueInput(device_id,start_address,qty,type,tag_name,device_name,modfunction);
              //finalans.push(ans.data);
           }
           else if (modfunction==3)
           {
               ans=await getMeterValueHolding(device_id,start_address,qty,type,tag_name,device_name,modfunction);
              // console.log(ans);
              // finalans.push(ans.data);
           }
           else if (modfunction==4)
           {
               ans=await getMeterValueInputRegister(device_id,start_address,qty,type,tag_name,device_name,modfunction);
               //finalans.push(ans.data);
           }
           else{
               console.log("No Function")
           }
           if(data_type=='Float32')
           {
              let loop=ans.data.length;
               for (let index3 = 0; index3 < loop; index3++) {
                  
                   const low   = ans.data[index3];
                   const high  = ans.data[index3 + 1];
                   //console.log(`${low}===${high}`);
                   //converted_data.push(uint16ToFloat32(low, high));
                   conval=uint16ToFloat32(low, high);
                   index3=index3+2;
      
               }
           }
           else if(data_type =='Bool')
           {
            conval=ans.data;
           }
         else{
            conval=ans.data;
         }
         //console.log(conval);
         finalans.push(conval);
         //await sleep(100)
        }  
        console.log("===================End================");    
   } catch (e) {
       console.log(e)
   } finally {
       table="serial_data"
       if (meter_d.length>0)
        {
           let query = "insert into " + table + " (";
           for (let index = 0; index < meter_d.length; index++) {
               var tagname =  meter_d[index].device_name+'_'+meter_d[index].tag_name;
               query += tagname + " ,";
           }
           //query = query.replace(/,\s*$/, "");
           for (let static = 0; static < batchmaster.length; static++) {
            let static_arr=['pin','status','batchno']
            //console.log(batchmaster[static])
            for(let i=0 ;i<static_arr.length; i++)
            {
               var tagname =  batchmaster[static].friendly_name+'_'+static_arr[i];
               query += tagname + " ,";              
            }
           // query = query.replace(/,\s*$/, "");
        }           
           query = query.replace(/,\s*$/, "");
           query += ") Values (";
           //console.log(finalans);
           for (let index1 = 0; index1 < finalans.length; index1++) {
               var value =  ""+finalans[index1]+"";
               query += value + " ,";
           }
           //query = query.replace(/,\s*$/, "");
           for (let static = 0; static < batchmaster.length; static++) {
            let static_arr=['pinno','status','batchno']
            //console.log(batchmaster[static])
            for(let i=0 ;i<static_arr.length; i++)
            {
               var fieldname=static_arr[i];
               var tagname=0;
              // console.log(batchmaster[static]);
              if(i==0){
               tagname =  batchmaster[static].pinno;
              }
              else if(i==1)
              {
               tagname =  `${batchmaster[static].status}`;
              }
              else if(i==2)
              {
               tagname =  `'${batchmaster[static].running_batchno}'`;
              }
               //var tagname =  batchmaster[static].fieldname;
               query += tagname + " ,";              
            }
            
        } 
        query = query.replace(/,\s*$/, ""); 
           query += ")";
           //console.log(query)
           insert_data_tags(query);
           
       }
   finalans=[];
   // setInterval(intervalFunc,1000)
   setTimeout(intervalFunc, 1000, 'funky');
   }
}

function intervalFunc() {      
               Tags(prototype="Modbus RTU");
               getMetersValue(meter_d);
               runningshift();
    }

  const getMeterValuecoil          = async (id,start_add,qty,type,tag_name,device_name,modfunction) => {
   try {
      var datareturn=-1;    
       await client.setID(id);
           let val   = await client.readCoils(start_add, qty);
           datareturn=val;
       return datareturn;
   } catch (e) {
     return datareturn
   }
}
const getMeterValueInput         = async (id,start_add,qty,type,tag_name,device_name,modfunction) => {
   try {

      var datareturn=-1;    
       await client.setID(id);
           let val   = await client.readDiscreteInputs(start_add, qty);
           datareturn=val;
       return datareturn;
   } catch (e) {
    //   converted_data.push({[tag_name]:0});
     //   if error return -1
     return datareturn
      // return converted_data;
   }
}
const getMeterValueHolding       = async (id,start_add,qty,type,tag_name,device_name,modfunction) => {
   try {
      var datareturn=-1;    
       await client.setID(id);
           let val   = await client.readHoldingRegisters(start_add, qty);
           datareturn=val;
       return datareturn;
   } catch (e) {
    //   converted_data.push({[tag_name]:0});
     //   if error return -1
     return datareturn
      // return converted_data;
   }
}
const getMeterValueInputRegister = async (id,start_add,qty,type,tag_name,device_name,modfunction) => {
   try {
       var datareturn=-1;    
       await client.setID(id);
           let val   = await client.readInputRegisters(start_add, qty);
           datareturn=val;
       return datareturn;
   } catch (e) {
      console.log(e)
    //   converted_data.push({[tag_name]:0});
     //   if error return -1
     return datareturn
      // return converted_data;
   }
}
function uint16ToFloat32(low, high) {
   var buffer    = new ArrayBuffer(4);
   var view = new DataView(buffer);
  // var DataView  = new Uint16Array(buffer);
   // var floatView = new Float32Array(buffer);
   // DataView[0]   = low;
   // DataView[1]   = high;
   view.setUint16(0, low);
   view.setUint16(2, high);
   // Read the bits as a float; note that by doing this, we're implicitly
   // converting it from a 32-bit float into JavaScript's native 64-bit double
   var num = view.getFloat32(0);
   return num.toFixed(2);
}
function sleep(millis) {
   return new Promise(resolve => setTimeout(resolve, millis));
 }
Tags(prototype="Modbus RTU").then(
   response =>{
   console.log(response)
    if(response.length>0)
    {
       
    }
    else
    {

    }   
 }
 )
 .finally(      
 );
exTest(tablecheck).then(
        response =>{
        console.log(response)
         //convert(response.datas)
         if(response.length>0)
         {
            console.log("Table Present");
         }
         else
         {
            console.log("Table Not Present");
            insert_data(opcua_data);
         }
      }
      )
      .finally(      
      )
      metermasterdata().then(
         response =>{
         console.log(response)      
       }
       )
       .finally(      
       );
       getallbatchdata().then(
         response =>{
         console.log(response)         
       }
       )
       .finally(      
       );
       runningshift();
getMetersValue(meter_d).then(
   response =>{
   console.log(response)
    //convert(response.datas)

   
 }
 )
 .finally(      
 );
