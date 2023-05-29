import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "ddi8xaplx",
    api_key: "574377622836685", 
    api_secret: "b9EhxentFFoUnZvQu_l5DM_PsuY"
})

export const uploadImage = async filePath =>{
    return await cloudinary.uploader.upload(filePath,{
        folder: 'posts'
    })
}

export const deleteImage = async id=> {
    return await cloudinary.uploader.destroy(id)
}
