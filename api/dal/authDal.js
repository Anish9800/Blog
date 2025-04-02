import pool from "../db.js"
import { isUserPresentQry, registerNewUserQry } from "../dbQueries/allQry.js"
import bcrypt from "bcrypt"

export const isUserPresent = async (req) =>{
    const conn = await pool.getConnection()
    let response = {}
    try{
        
        const [rows,fields] = await conn.execute(isUserPresentQry(),[req.body.email])
        response.data = rows.length

    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
} 

export const registerNewUser = async (req) =>{
    const salt = bcrypt.genSaltSync(10);
    const encryptedPw = bcrypt.hashSync(req.body.password, salt);
    const conn = await pool.getConnection()
    let response = {}
    try{
        
        const [rows,fields] = await conn.execute(registerNewUserQry(),
        [req.body.username,req.body.email,encryptedPw] )
        response.data = rows.length

    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
    
}

export const checkUserLogin = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        
        const [rows,fields] = await conn.execute(isUserPresentQry(),[req.body.email])
        const [{password, ...other}] = rows
        const isValid = bcrypt.compareSync(req.body.password, password)
        response.data = {isValid,other}
    }
    catch(err){
       response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }
    return response
}