import postModel from '../models/post.js'
import {uploadImage, deleteImage} from "../libs/cloudinary.js";
import fs from 'fs-extra'
 
export const getPosts = async(req,res) =>{

   try {
      const posts = await postModel.find()
      res.send(posts)
   } catch (error) {
      console.error(error.message)
      return res.status(500).json({message: error.message})
   }
} 

export const createPost = async (req,res) =>{
   try {
      const{title, description} = req.body;
      let image;

      if(req.files && req.files.image){

         const result = await uploadImage(req.files.image.tempFilePath)
         console.log(result)
         image = {
            url: result.secure_url,
            public_id: result.public_id
         }
         await fs.remove(req.files.image.tempFilePath)
      }
      
      const newPost = new postModel({title,description, image})
   
      

      console.log(newPost)
      await newPost.save()
      return res.json(newPost)
   
   } catch (error) {
      console.error(error.message)
      return res.status(500).json({message: error.message})
   }
 }


export const deletePost = async (req,res) =>{
   try {
      const postRemoved = await postModel.findByIdAndDelete(req.params.id)

      if(postRemoved.image?.public_id){
         console.log("post originally removed")
         await deleteImage(postRemoved.image.public_id)  
      }
      if(!postRemoved) return res.sendStatus(404)
      
      
      return res.sendStatus(204)
      
   } catch (error) {
      console.error(error.message)
      return res.status(500).json({message: error.message})
   }
    
}


export const updatePost = async (req,res) =>{
   try {
      const post = await postModel.findByIdAndUpdate(req.params.id, req.body,{new: true})
      console.log(post)
      return res.send('updated post')
   } catch (error) {
      console.error(error.message)
      return res.status(500).json({message: error.message})
   }
}


export const getPost = async (req,res) =>{
   try {
      const post = await postModel.findById(req.params.id)
      if(!post) return res.sendStatus(404)
      return res.json(post)
      
   } catch (error) {
      console.error(error.message)
      return res.status(500).json({message: error.message})
   }
    
}
