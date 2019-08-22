const express= require("express");
const app=express();
const mongoose= require("mongoose");
const morgan= require("morgan");
const bodyParser= require("body-parser");
const expressValidator = require('express-validator')
const dotenv= require("dotenv");
dotenv.config();
mongoose
	.connect(
		process.env.MONGO_URI,
		{useNewUrlParser:true}
	)
	.then(()=>{console.log("db connected")});
	
 mongoose.connection
	.on('error',(error)=>{console.log("error: ". error);
 });

const postRoutes=require("./routes/post");
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use("/",postRoutes);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{});