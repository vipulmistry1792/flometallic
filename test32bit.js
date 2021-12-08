// Create a buffer
var buf = new ArrayBuffer(4);
// Create a data view of it
var view = new DataView(buf);
// Write the ints to it
//view.setUint16(0, 17269);
//view.setUint16(2, 31688);
view.setUint16(0, 65535);
view.setUint16(2, 65535);
// Read the bits as a float; note that by doing this, we're implicitly
// converting it from a 32-bit float into JavaScript's native 64-bit double
var num = view.getFloat32(0);
// Done
console.log(num.toFixed(2));