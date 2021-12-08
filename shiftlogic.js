
//var dateFormat = require('dateformat');
//var days=dateFormat(new Date(), "hh:MM:ss");
var days=new Date();
var isodate = new Date().toISOString()
var dateString="1904-12-06 07:00:00"
//var dateString1=`1904-12-07 ${days.toTimeString()}`;
//console.log(dateString1)
var dateString2="1905-12-06 04:00:00"
var d1;
d1=new Date(dateString).toISOString()
d1=new Date().toISOString()
var d2=new Date(d1);
var dateString1=`${d2.toDateString()} ${days.toTimeString()}`;
d3=new Date(dateString1).toISOString();
console.log(d3)
var d4=new Date(d3);
var s=480*60;
var newdatearr=[];
var newdatearr1=[];
for (let index = 0; index < 4; index++) {
    if(index==0)
    {
        let dta=d2.setSeconds(d2.getSeconds() + s)
        newdatearr.push(dta);
    }
    let dta=d2.setSeconds(d2.getSeconds() + s)
    
    //console.log({d2})
   // d1=seconds;
    newdatearr.push(dta)
}
boolarray=[];

// for (let index = 0; index < newdatearr.length; index++) {
// if(d4.getSeconds()>=newdatearr[0] && d4.getSeconds()<=newdatearr[1] )
// {
//     boolarray.push(true)
// }
    
// }
//timeObject = timeObject + seconds;
//var d2=new Date(dateString1).toISOString()
console.log(isodate)
console.log(newdatearr)
console.log(d4)
console.log(boolarray)
console.log(dateString1)