const express= require("express");
const { check, validationResult } = require('express-validator');
const {signUp,signIn,signOut}= require('../controllers/auth');
const {userById}= require('../controllers/user');
const router=express.Router();
const User= require("../models/user");



router.post('/signUp',
  [
    check('name',"title cant be empty").not().isEmpty(),
    check('name',"title must be between 4 to 150").isLength({min:4,max:150}).withMessage('Name must have more than 5 characters'),

    //BODY
    check('email',"Write a body").not().isEmpty(),
    check('email',"Email must be between 3 to 32 character")
       .matches(/.+\@.+\..+/)
       .withMessage("Email must contain @ ")
       .isLength({
          min:4,
          max:2000
    }),
    check('password',"Write a body").not().isEmpty(),
    check('password',"Email must be between 3 to 32 character") 
        .isLength({
          min:4,
          max:50
        })      
       .withMessage("Must be atleast 6 character ")
       .matches(/\d/)
       .withMessage("password must contain a number")        
  ],
  function (req, res) {
    const errors = validationResult(req);
    

    if (!errors.isEmpty()) {
      console.log(errors.mapped()[0]);
      return res.status(400).jsonp(errors.array()[0]);
      
    }
       signUp(req,res);
});


router.post('/signIn',signIn);
router.get('/signOut', signOut);

//any route with user id,our app will execute this first
router.param("userId",userById);



module.exports = router;
// router.post('/post',validator.createPostValidator,postController.createPosts);
// module.exports = router;