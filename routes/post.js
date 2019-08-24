const express= require("express");
const { check, validationResult } = require('express-validator');
const {getPosts,createPosts}= require('../controllers/post');
const {requireSignIn}= require('../controllers/auth');
const {userById}= require('../controllers/user');
const router=express.Router();
const Post= require("../models/post");


router.get('/',getPosts);

router.post('/post', requireSignIn,
  	[
      check('title',"Title can not be empty").not().isEmpty(),
  		check('title',"title must be between 4 to 150").isLength({min:4,max:150}).withMessage('Name must have more than 5 characters'),

  	//BODY
  		check('body',"Write a body").not().isEmpty(),
  		check('body',"body must be between 4 to 2000").isLength({min:4,max:2000})
    ],
  function (req, res) {
    const errors = validationResult(req);
    

    if (!errors.isEmpty()) {
    	
      return res.status(400).json(errors.array()[0].msg);
      
    }
      createPosts(req,res);
    
  });

//any route with user id,our app will execute this first
router.param("userId",userById);
module.exports = router;
// router.post('/post',validator.createPostValidator,postController.createPosts);
// module.exports = router;