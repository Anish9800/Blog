import { Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [formValue, setFormValue] = useState({username:"",email:"",password:""})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try{
            const res = await axios.post("auth/register",formValue)
            navigate("/login")
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
            <h1>Register</h1>
            <form action={handleSubmit}>
                <input required type='text' placeholder="username" name="username" value={formValue.username} onChange={handleChange}/>
                <input required type='email' placeholder="email" name="email" value={formValue.email} onChange={handleChange}/>
                <input required type='password' placeholder="password" name="password" value={formValue.password} onChange={handleChange}/>
                {msg && <p>{msg}</p>}
                <button>Register</button>
                <span>Do you have an account?<Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Register