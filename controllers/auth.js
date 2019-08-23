const User= require("../models/user"); 
const jwt= require('jsonwebtoken');
require('dotenv').config();

exports.signUp= async (req,res)=>{
	 const userExists= await User.findOne({email:req.body.email});
	 
	 if(userExists){
	 	return res.status(403).json({
	 			error: "Email already exist!"
	 		});
	 } 
	 const user= await new User(req.body);
	 await user.save()
	 			.then(result=>{
					res.json({
					user:result,
					msg:"msd"
			});
		})
};