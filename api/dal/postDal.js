import pool from "../db.js"
import { getAllPostsQry, getPostsByCatQry, getPostsByIdQry, createPostQry, updatePostQry, deletePostQry} from "../dbQueries/allQry.js"

export const getAllPosts = async () => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getAllPostsQry())
        response.data = rows

    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const getPostsByCat = async (postCat) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getPostsByCatQry(postCat))
        response.data = rows

    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const getPostsById = async (postId) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getPostsByIdQry(postId))
        response.data = rows

    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const createPost = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(createPostQry(),
        [req.title, req.body, req.imageUrl, req.user, req.cat])
        response.data = rows.affectedRows
    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const updatePostDal = async (postId,userId,req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(updatePostQry(postId,userId),
        [req.body.title, req.body.body, req.body.imageUrl, req.body.cat])
        response.data = rows.affectedRows
    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const deletePostDal = async (postId,userId) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(deletePostQry(postId,userId))
        response.data = rows.affectedRows
    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}