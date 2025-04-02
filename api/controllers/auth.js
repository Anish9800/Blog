import { isUserPresent, registerNewUser, checkUserLogin} from "../dal/authDal.js"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    //check if the user present or not
    const isPresent = await isUserPresent(req)
    if(isPresent.error){
        return res.json(isPresent.error)
    }
    if(isPresent.data){
        return res.status(409).json("User already exists!")
    }
    else{
        const response = await registerNewUser(req)
        if(response.error){
            return res.status(409).json("Error in creating user!")
        }
        return res.status(200).json("User has been created Successfully!")
    }

}

export const login = async (req,res) => {
     //check if the user present or not
     const isPresent = await isUserPresent(req)
     if(isPresent.error){
        return res.json(isPresent.error)
     }
     if(!isPresent.data){
        return res.status(404).json("User not found!")
     }
     const response = await checkUserLogin(req)
     if(response.error){
        return res.status(409).json("Error in logging in user!")
     }
     if(!response.data.isValid){
        return res.status(400).json("wrong email or password!")
     }
     const {id} = response.data.other
     const token = jwt.sign({id},"jwtkey")
     res.cookie("access_token",token,{
        httpOnly:true
    }).status(200).json(response.data.other)
     //return res.json("user logged in!")
}

export const logout = (req,res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}