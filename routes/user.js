const express= require("express");
const router=express.Router();

const User= require("../models/user");
const {requireSignIn}= require('../controllers/auth');
const {
	userById, 
	allUsers,
	getUser,
	updateUser,
	deleteUser
}= require('../controllers/user');






router.get('/users', allUsers);
router.get('/user/:userId', requireSignIn,getUser);
router.put('/user/:userId', requireSignIn, updateUser);
router.delete('/user/:userId', requireSignIn, deleteUser);

//any route with user id,our app will execute this first
router.param("userId",userById);



module.exports = router;
