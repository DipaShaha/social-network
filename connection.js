const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost/fb");
mongoose.connection.once('open',function(){
	console.log("connection has been made");
}).on('error',()=>{
	console.log("db error");
});