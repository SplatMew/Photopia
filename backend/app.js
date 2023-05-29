import express from 'express'
import routes from './routes/posts_routes.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'



const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

//routes
app.use(routes)




export default app