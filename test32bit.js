// // Create a buffer
// var buf = new ArrayBuffer(4);
// // Create a data view of it
// var view = new DataView(buf);
// // Write the ints to it
// //view.setUint16(0, 17269);
// //view.setUint16(2, 31688);
// view.setUint16(0, 65535);
// view.setUint16(2, 65535);
// // Read the bits as a float; note that by doing this, we're implicitly
// // converting it from a 32-bit float into JavaScript's native 64-bit double
// var num = view.getFloat32(0);
// // Done
// console.log(num.toFixed(2));

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
var dt1 =dateTime.create("1904-01-01 07:00:00");
var formatted1 = dt1.format('Y-m-d H:M:S');
var dt2 = dateTime.create("1904-01-01 15:00:00");
var formatted2 = dt2.format('Y-m-d H:M:S');
var dt3 = dateTime.create("1904-01-01 23:00:00");
var formatted3 = dt3.format('Y-m-d H:M:S');
var dt4 = dateTime.create("1904-01-02 07:00:00");
var formatted4 = dt4.format('Y-m-d H:M:S');
console.log(`${formatted1}==${formatted2}==${formatted3}==${formatted4}`);