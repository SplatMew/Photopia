import axios from 'axios'

export const getPostsRequests = async() => await axios.get('https://photopia-srv.onrender.com/posts')

export const createPostRequest = async(post) => {
    const form = new FormData()                                
    for (let key in post) {
        form.append(key, post[key])
    }

    return await axios.post('https://photopia-srv.onrender.com/posts', form,{
                                        headers:{
                                            "Content-Type": "multipart/form-data"
                                        }
                                    });

                                }

export const deletePostRequest = async id => await axios.delete('https://photopia-srv.onrender.com/posts/' + id)

export const getPostRequest = async id => await axios.get('https://photopia-srv.onrender.com/posts/' + id)

export const putPostRequest = async (id, newFields) => await axios.put('https://photopia-srv.onrender.com/posts/' + id, newFields)