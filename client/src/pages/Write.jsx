import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import axios from "axios"

const Write = () => {
    const state = useLocation().state
    const [value, setValue] = useState(state?.description||'')
    const [postData, setPostData] = useState({title:state?.title||"",cat:state?.cat||""})
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const upload = async () => {
        try{
            const formData = new FormData()
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data
        }
        catch(err){
            console.log(err)
        }
    }
    const handleChange = (e) => {
        const {value,name} = e.currentTarget
        setPostData(prev => {
            return {...prev, [name]:value}
        })
    }
    const handleChangeFile = (e) => {
        const img = e.target.files[0]
        setFile(img)
    }

    const handleClick = async (e) => {
        const imageUrl = await upload()
        try{
            state
            ? await axios.put(`/posts/${state.id}`, {title:postData.title,body:value,imageUrl:file?imageUrl:"",cat:postData.cat}, {withCredentials: true})
            : await axios.post("/posts", {title:postData.title,body:value,imageUrl:file?imageUrl:"",cat:postData.cat}, {withCredentials: true})

            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" name="title" value={postData.title} onChange={handleChange}/>
                <div className='editorContainer'>
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id="file" name="img"  onChange={handleChangeFile}/>
                    <label className='file' htmlFor='file'>{file?file.name:"Upload Image"}</label>
                    <div className='buttons'>
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>{state?"Update":"Publish"}</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "art"} name="cat" value="art" id="art" onChange={handleChange}/>
                        <label htmlFor='art'>Art</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "science"} name="cat" value="science" id="science" onChange={handleChange}/>
                        <label htmlFor='science'>Science</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "technology"} name="cat" value="technology" id="technology" onChange={handleChange}/>
                        <label htmlFor='technology'>Technology</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={handleChange}/>
                        <label htmlFor='cinema'>Cinema</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "design"} name="cat" value="design" id="design" onChange={handleChange}/>
                        <label htmlFor='design'>Design</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" checked={postData.cat === "food"} name="cat" value="food" id="food" onChange={handleChange}/>
                        <label htmlFor='food'>Food</label>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Write