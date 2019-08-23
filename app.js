const express= require("express");
const app=express();
const mongoose= require("mongoose");
const morgan= require("morgan");
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
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
//end connect mongodb

//start bring in routes
const postRoutes=require("./routes/post");
const authRoutes=require("./routes/auth");

//end bring in routes


//start use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

	//use route middleware
app.use("/",postRoutes);
app.use("/",authRoutes);

//end use middleware

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{});