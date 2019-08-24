const mongoose= require("mongoose");
const uuidv1 = require('uuid/v1')
const crypto = require('crypto');
const userSchema= new mongoose.Schema({

	name:{
		type:String,
		trim:true,
		required:true
	},
	email:{
		type:String,
		trim:true,
		required:true
	},
	hashed_password:{
		type:String,
		required:true
	},
	salt:String,
	created:{
		type:Date,
		default:Date.now
	},
	updated:{
		type:Date,
		default:Date.now
	}

});
userSchema.virtual('password')
	.set(function(password){
		 //create temporary variable called _password
		this._password=password;
		//generate  atimesspamn
		this.salt=uuidv1();
		//encrypt pass
		this.hashed_password=this.encryptPassword(password);
		
	})
	.get(function(){
		return thid._password
	});

	//method encryptPassword
	userSchema.methods={
		authenticate:function(plainText){
			return this.encryptPassword(plainText)===this.hashed_password;
		},	 	

		// encryption function
		encryptPassword: function(password){
			if(!password) return "";
			try{
				
				return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex');
			}catch(e){
				console.log(e);
				return "";
			}

		}
	}

module.exports=mongoose.model("User",userSchema)