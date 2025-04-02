import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../context/authContext"
import axios from 'axios'

const Login = () => {

    const [formValue, setFormValue] = useState({email:"",password:""})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)

    const handleSubmit = async (e) => {
        try{
            await login(formValue)
            navigate("/")
        }
        catch(err){
            setMsg(err.response.data)
        }
        
    }

    const handleChange = (e) => {
        setMsg("")
        const {value, name} = e.currentTarget
        setFormValue(prev => {
            return {...prev , [name]:value}
        })
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form action={handleSubmit}>
                <input required type = 'email' name='email' value={formValue.email} placeholder="email" onChange={handleChange}/>
                <input required type = 'password' name='password' value={formValue.password} placeholder="password" onChange={handleChange}/>
                <button>Login</button>
                { msg && <p>{msg}</p>}
                <span>Don't you have an account?<Link to='/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default Login