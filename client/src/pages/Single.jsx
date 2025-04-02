import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import moment from "moment"
import Menu from '../components/Menu'
import author from '../img/author.png'
import edit from '../img/edit.png'
import del from '../img/delete.png'
import { AuthContext } from '../context/authContext'
import { getText } from '../../public/htmlProcesseor'

const Single = () => {
    const [post, setPost] = useState({id:"",title:"",description:"",img:"",date:"",cat:"",username:"",profileImage:""})
    const params = useParams()
    const postId = params.id
    const {currentUser}  = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get(`/posts/${postId}`)
                if(res.status == 200 && res.data.length){
                    const [data] = res.data
                    setPost(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }

        fetchPosts()
    },[postId])

    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${postId}`, {withCredentials: true})
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className="single">
            <div className="content">
                { post.img && <img src={`../public/upload/${post.img}`} alt='post image'/>}
                <div className="user">
                    {post.profileImage && <img src={post.profileImage} alt='author image'/>}
                    <div className='info'>
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser  && currentUser.username === post.username && 
                        <div className='edit'>
                            <Link to='/write?edit=2' state={post}>
                                <img src={edit} alt='edit post' />
                            </Link>
                            <img onClick={handleDelete} src={del} alt='delete post' />
                        </div>
                    }
                </div>
                <h1>{post.title}</h1>
                <p>
                    {getText(post.description)}
                </p>
            </div>
            <Menu postCat={post.cat}/>
        </div>
    )
}

export default Single