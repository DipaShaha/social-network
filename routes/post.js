const express= require("express");
const { check, validationResult } = require('express-validator');
const {getPosts,createPosts}= require('../controllers/post');
const router=express.Router();
router.get('/', getPosts);
const Post= require("../models/post");
router.post('/post',
	[
    	check('title',"Write a title").not().isEmpty(),
		check('title',"title must be between 4 to 150").isLength({min:4,max:150}).withMessage('Name must have more than 5 characters'),

	//BODY
		check('body',"Write a body").not().isEmpty(),
		check('body',"body must be between 4 to 2000").isLength({min:4,max:2000})
  	],
  function (req, res) {
    const errors = validationResult(req);
    

    if (!errors.isEmpty()) {
    	console.log(errors.mapped()[0]);
      return res.status(400).jsonp(errors.array()[0]);
      
    }
      createPosts(req,res);
    
  });

module.exports = router;
// router.post('/post',validator.createPostValidator,postController.createPosts);
// module.exports = router;