const express= require("express");
const app=express();
const mongoose= require("mongoose");
const morgan= require("morgan");
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const expressValidator = require('express-validator')
const fs= require('fs');
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
const userRoutes=require("./routes/user");

//api docs
app.get('/',(req,res)=>{
		fs.readFile('docs/apiDocs,json',(err,data)=>{
			if(err){
				res.status(400).json({error:err})
			}
			const docs= JSON.parse(data);
			res.json(docs);
		})
})

//end bring in routes


//start use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

	//use route middleware
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"unauthorized"});
  }
});

//end use middleware

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{});