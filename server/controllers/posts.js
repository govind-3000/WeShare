import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res)=>{
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } 
    catch (error) {
        res.status(404).json({messsage: error.messsage});
    }
};

export const createPosts = async (req, res)=>{
    const post = req.body;
    const newpost = PostMessage(post);
    try {
        await newpost.save();
        res.status(201).json(newpost);
    } 
    catch (error) {
        res.status(409).json({ messsage: error.messsage });
    }
};

export const updatePost = async(req, res) =>{
    const {id : _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});
    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndDelete(id);
    res.json({message: 'Post deleted Successfully!...'});
}

export const likePost = async(req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new:true});
    res.json(updatedPost);
}