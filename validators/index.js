// const express= require("express");
// var router = express.Router();
const { check, validationResult } = require('express-validator');

exports.createPostValidator= (req,res,next)=>{
	check('title',"Write a title").not().isEmpty();
	check('title',"title must be between 4 to 150").isLength(
		{ 	min:4,
			max:150
		}
	);

	//BODY
	check('body',"Write a body").not().isEmpty();
	check('body',"body must be between 4 to 2000").isLength(
		{ 	min:4,
			max:2000
		}
	);

	const errors = validationResult(req);
	console.log(errors.mapped()[0]);
	if(errors){
		// const firstError=errors.mapped(error=>error.msg)[0];
		// return res.status(400).json({error: firstError});
		 return res.json({ errors: errors.array()[0]});
	}
	//procedd to next middleware
	next();	
}