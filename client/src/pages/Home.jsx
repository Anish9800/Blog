import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { getText } from "../../public/htmlProcesseor"
import axios from "axios"

const Home = () => {
    const [posts, setPosts] = useState([])
    const paramsCat = useLocation().search

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get(`/posts${paramsCat}`)
                if(res.status == 200){
                    setPosts(res.data)
                }
            }
            catch(err){
                console.log(err)
            }
        }

        fetchPosts()
    },[paramsCat])
    
    const postData = posts.map(item => {
        return  <div key={item.id} className="post">
                    <div className="img">
                        <img src={`../public/upload/${item.img}`} alt="post image"/>
                    </div>
                    <div className="content">
                        <Link to={`/post/${item.id}`} className="link">
                            <h1>{item.title}</h1>
                        </Link>
                        <p>{getText(item.description)}</p>
                        <button>Read More</button>
                    </div>
                </div>
    })  
    return (
        <div className="home">
            <div className="posts">
                {postData}
            </div>
        </div>
    )
}

export default Home