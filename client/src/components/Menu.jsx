import axios from "axios"
import { useState, useEffect } from "react"

const Menu = ({postCat}) => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get(`/posts?cat=${postCat}`)
                if(res.status == 200){
                    setPosts(res.data)
                }
            }
            catch(err){
                console.log(err)
            }
        }

        fetchPosts()
    },[postCat])

    const postData = posts.map(item => {
        return  <div className="post" key={item.id}>
                    <img src={`../public/upload/${item.img}`} alt='post image'/>
                    <h2>{item.title}</h2>
                    <button>Read More</button>
                </div>
    })
    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {postData}
        </div>
    )
}

export default Menu