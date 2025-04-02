import { createPost, deletePostDal, getAllPosts, getPostsByCat, getPostsById, updatePostDal } from "../dal/postDal.js"
import jwt from "jsonwebtoken"

export const getPosts = async (req,res) => {
    
    const response =  req.query.cat? await getPostsByCat(req.query.cat) : await getAllPosts()
    if(response.error){
        return res.status(500).json("Error fetching posts!")
    }
    return res.status(200).json(response.data)
}

export const getPost = async (req,res) => {
    const response = await getPostsById(req.params.id)
    if(response.error){
        return res.status(500).json("Error fetching post!")
    }
    return res.status(200).json(response.data)
}

export const addPost = async (req,res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated!")
    }
    jwt.verify(token,"jwtkey", async(err,userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        const response = await createPost({...req.body,user:userInfo.id})
        if(response.error){
            return res.status(500).json("Error creating post!")
        }
        if(!response.data){
            return res.status(409).json("Post not created, check again!")
        }
        return res.status(200).json("Post created successfully!")
    })    
}

export const updatePost = async (req,res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated!")
    }
    jwt.verify(token,"jwtkey", async(err,userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        const response = await updatePostDal(req.params.id,userInfo.id,req)
        if(response.error){
            return res.status(500).json("Error updating post!")
        }
        if(!response.data){
            return res.status(409).json("Post not updated, check again!")
        }
        return res.status(200).json("Post updated successfully")

    })
}

export const deletePost = async (req,res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated!")
    }
    jwt.verify(token,"jwtkey", async(err,userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        const response = await deletePostDal(req.params.id, userInfo.id)
        if(response.error){
            return res.status(500).json("Error deleting post!")
        }
        if(!response.data){
            return res.status(409).json("Post not deleted, check again!")
        }
        return res.status(200).json("Post deleted successfully")
    })
    
}