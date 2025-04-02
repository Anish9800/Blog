import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import postRouters from "./routes/posts.js"
import userRouters from "./routes/users.js"
import authRouters from "./routes/auth.js"
import './db.js'
import multer from "multer"

const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSucessStatus:200
}
app.use(cors(corsOptions))
app.use(cookieParser())
//body-parser (parses incoming requests with JSON payload)
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  

const upload = multer({storage})
app.post('/api/upload', upload.single('file'), (req,res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/api/posts',postRouters)
app.use('/api/users',userRouters)
app.use('/api/auth',authRouters)

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`)
})