import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
     description: {
        type: String,
        required: true,
        trim: true
     },
     image:{
        type: Object,
        public_id: String
    }
})


export default mongoose.model('post', postSchema)
