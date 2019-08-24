const User= require("../models/user"); 
const jwt= require('jsonwebtoken');
const expressjwt= require('express-jwt');
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


exports.signIn=(req,res)=>{
	//find the user based on email
    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
    	//if error or no useer
    	if(err || !user){
    		return res.status(400).json({
    			error:"User with this email does not exist.Please Sign Up."
    		})
    	}
    	//if found user authenticate and create authenticate 
    	if(!user.authenticate(password)){
    		return res.status(401).json({
    			error:"Email and Password not correct!"
    		})
    	}
    	// generate with token user_id and secret
    	const token= jwt.sign({_id:user._id},process.env.JWT_SECRET);

    	//process the toekn as t in cookie  with expiry date for server side
    	res.cookie("t",token,{ecpire:new Date()+9999});

    	//return response with user and token to front end client
    	const{_id,name,email}=user;
    	return res.json({token,user:{_id,email,name}});
    })	
}


exports.signOut=(req,res)=>{
	res.clearCookie("t");
	return res.status(200).json({msg:"Successfully Logged out"});
}

exports.requireSignIn=expressjwt({
	//if the secret token is valid then the jwt opens the verified user id 
	//in an auth key in a required object
	secret:process.env.JWT_SECRET,
	userProperty:"auth"
})