const Post= require("../models/post");
const formidable= require ('formidable');
const fs= require('fs');
const _lodash= require('lodash');

exports.postById=(req,res,next,id)=>{
	Post.findbyId(id)
	.populate("postedBy", "_id name")
	.exec((err,post)=>{
		if(err || !post){
			return res.status(400).json({ error: err})
		}
		req.post=post;
		next();
	})
}

exports.getPosts=(req,res)=>{
	const posts=Post.find()
		.populate("postedBy","_id name")
		.select("_id title body")
		.then((posts)=>{
			res.json({posts})
		})
		.catch(err=>{ console.log(err)})
}

exports.createPosts=(req,res)=>{
	let form= new formidable.IncomingForm();
	form.keepExtensions= true;
	form.parse(req,(err,fields,files)=>{ 
		if(err){
			return res.status(400).json({ error: "Image couldnt be uploaded"})
		}
		let post = new Post(fields);

		post.postedBy=req.profile;

		if(files.photo){
			post.photo.data=fs.readFileSync(files.photo.path);
			post.photo.contentType=files.photo.type
		}
		post.save((err,result)=>{
			if(err){
			return res.status(400).json({ error: err})
			}
			res.json(result);

		})
	})
	// const post = new Post(req.body);  
	// post.save()
	// 	.then(result=>{
	// 		res.json({
	// 			post:result,
	// 			msg:"msd"
	// 		});
	// 	})
}
	
exports.postsByUser=(req,res)=>{
	const posts=Post.find({postedBy:req.profile._id})
					.populate("postedBy","_id name")
					.sort("_created")
					.exec((err,posts)=>{
						if(err){
							 return res.status(400).json({ error: err})
						}
						res.json(posts);
					})
}


exports.isPoster=(req,res,next)=>{
	let isPoster=req.post && req.auth && req.post.postedBy._id=== req.auth._id;
	if(!isPoster){
		return res.status(403).json({error:"User not Authorized"});
	}
	next();
}

exports.updatePost=(req,res,next)=>{
	let post = req.post;
	post=_.extend(post,req.body);
	post.updated = Date.now();
	post.save(err=>{
		if(err){
			return res.status(400).json({error:err});
		}
		res.json(post);
	})

}

exports.deletePost=(req,res)=>{
	let post = req.post;
	post.remove((err,post)=>{
		if(err){
			return res.status(400).json({error:err});
		}
		res.json({ message: "Successfully Deleted"});
	})
}