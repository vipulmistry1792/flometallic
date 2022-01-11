
const meters = require('./services/meter_master.service');
const batchDetail = require('./services/batch_detail.service');
const batchMaster = require('./services/batch_master.service');
const Batchenergy = require('./services/furnacedashboard');
const IdealDetail = require('./services/ideal_detail.service');
async function pollcb(batch)
{
        let lastbachno=0;
        let unique_batch=1;
        let starttime=new Date();
        let laststarttime;
        let lastendtime;
        let lastendtime1;
        let pin=batch.pinno;
        let state =batch.state;
        let std_time=0;
        let ton_kwh=0;
        let set_kwh=0;
        let difftime = 0;
        var batch = {} // empty Object
        var batch1 = {} // empty Object
        var batch_up = {} // empty Object
        var batch_energy = {} // empty Object
        var idealtime = {} // empty Object
        var batch1_up = {} // empty Object
        let up=0; 
        let emptybatch=0;       
        meterdata = await meters.getmeterusingpinno(pin);
        //console.log(meterdata);
        let meterno = meterdata[0].machineno;
        let friendly_name = meterdata[0].friendly_name;
        let lastbatchdetail=await batchDetail.getlastbatchno(meterno)
        let lastbatchdata=await batchMaster.getlastbatchnopin(`${meterno}`);
        std_time=lastbatchdata[0].stdbatchtime;
        ton_kwh=lastbatchdata[0].ton_kwh;
        set_kwh=lastbatchdata[0].kwh;
        if(lastbatchdetail.length > 0)
        {
                emptybatch=1;
                lastbachno=lastbatchdetail[0].batchno;
                lastbachno1=lastbatchdetail[0].batchno;
                unique_batch=(lastbatchdetail[0].unique_batch)+1
                var n=(lastbachno.search("-"))+1;
                let n1=lastbachno.substring(n)
                
                lastbatchstart=(lastbatchdetail[0].batchno).substring(0,n)
                if(lastbatchstart==(lastbatchdata[0].batchno).substring(0,n))
                {
                        n1=parseInt(n1)+1
                        lastbachno=(lastbatchdetail[0].batchno).substring(0,n)+n1.toString();
                }
                else{
                        up=1;
                        lastbachno=lastbatchdata[0].batchno; 
                }
                console.log(lastbatchdetail[0]);
                laststarttime=Date.parse(lastbatchdetail[0].batchstarttime);
                lastendtime=Date.parse(lastbatchdetail[0].batchendtime);
                console.log(lastendtime);
        }
        else{
	      // console.log(lastbatchdata)
                emptybatch=0;
                lastbachno=lastbatchdata[0].batchno;
                uniq_batch=1;
                laststarttime=new Date();
                lastendtime='NULL';
        }
//        if (rpio.read(pin))
  //              return;
       batch={
               "batchno":lastbachno,
               "pinno":pin,
               "machineno":meterno,
               "batchstarttime":starttime,
               "unique_batch":unique_batch,
               "std_time":std_time,
               "ton_kwh":ton_kwh,
               "set_kwh":set_kwh
       }
       batch_up={
        "batchno":lastbachno,
        "machineno":meterno,
        "status":1,
        "pinno":pin,
        "friendly_name":friendly_name
}

    console.log(batch)
       if(lastbatchdetail.length > 0)
       {
        // console.log("true")
        dup_batch=await batchDetail.duplicatebatchcheck(meterno,lastbachno);
      //  console.log(dup_batch.length)
        if(dup_batch.length > 0)
        {

        }
        else{
                laststarttime=new Date(laststarttime);
                lastendtime=new Date(lastendtime);
                batchtime=(starttime.getTime()-laststarttime.getTime())/1000
                //console.log(`${starttime.getTime()} ====  ${lastendtime.getTime()}` )
                difftime=(starttime.getTime()-lastendtime.getTime())/1000
                //difftime=0;
                idealtime={
                        "batchno":lastbachno,
                        "pinno":pin,
                        "machineno":meterno,
                        "batchstarttime":starttime,
                        "unique_batch":unique_batch,
                        "std_time":std_time,
                        "ton_kwh":ton_kwh,
                        "set_kwh":set_kwh,
                        "batchtime":difftime,
                        "friendly_name":friendly_name
                }
                console.log(idealtime)
                if(batchtime>30 || emptybatch == 0)
                {
                        dup_batch1=await batchDetail.duplicatebatchcheck(meterno,lastbachno);
                        if(dup_batch1.length>0)
                        {
 
                        }
                        else
                        {
                               // console.log("False")
			       if(state==1)
				{
                                        //console.log(lastendtime)
                                        if(lastendtime !=''  || lastendtime !='NULL' || emptybatch == 0){
                                                let p= await batchDetail.create(batch);
                                                let q= await batchMaster.updaterunningbatch(batch_up);
                                                if(lastbatchdetail.length > 0){
                                                let r= await IdealDetail.update(idealtime);
                                                }
                                        }

				}
                               // console.log(p)
                               if(up=0)
                               {
                                var n=(lastbachno.search("-"))+1;
                                lastbachno=lastbachno.substring(n)
                                lastbachno=parseInt(lastbachno)-1
                                lastbachno=(lastbatchdetail[0].batchno).substring(0,n)+lastbachno.toString();
                               }
                               else{
                                lastbachno=lastbatchdetail[0].batchno    
                               }
                                batch1={
                                        "batchno":lastbachno,
                                        "pinno":pin,
                                        "machineno":meterno,
                                        "batchendtime":starttime,
                                        "batchtime":batchtime
                                }
                                if(state==0)
                                {
                                        batch_energy={
                                                "batchno":lastbachno1,
                                                "machineno":meterno,
                                                "friendly_name":friendly_name
                                        }
                                        batch_up={
                                                "batchno":'',
                                                "machineno":meterno,
                                                "status":2,
                                                "pinno":pin,
                                                "friendly_name":friendly_name
                                        }
                                        
                                                let q= await batchDetail.update(batch1);
                                                let r= await batchMaster.updaterunningbatch(batch_up);
                                                let s= await Batchenergy.energyupdate(batch_energy);
                                                let t= await IdealDetail.create(batch);                                      

                                }
                                
                                //let r=await batchMaster.nextbatchno(meterno,nextbatchno)
                        }
 
                }
        }
       }
       else{
        dup_batch=await batchDetail.duplicatebatchcheck(meterno,lastbachno);
                        if(dup_batch.length > 0)
                        {

                        }
                        else{
				if(state==1){
                                let p= await batchDetail.create(batch);
				}
				else{
				
				} 
                        }
                
               
       }
}
module.exports = {
        pollcb
      } 
