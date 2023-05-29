import { useState, useContext, createContext, useEffect } from 'react'
import { getPostsRequests, createPostRequest, deletePostRequest, getPostRequest, putPostRequest } from '../api/posts.js'
const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    //Hace la peticion GET al backend y recupera las publicaciones ya hechas.
    const getPosts = async () => {
        const res = await getPostsRequests()
        setPosts(res.data)
    }

    //Hace la peticion POST al backend para hacer nuevas publicaciones
    const createPost = async (post) => {
        try {

            const res = await createPostRequest(post)
            setPosts([...posts, res.data])
        } catch (error) {
            console.log(error)

        }
    }

    //Hace la peticion DELETE al backend para eliminar una publicacion
    const deletePost = async (id) => {

        try {
            const res = await deletePostRequest(id)
            if (res.status === 204) {
                setPosts(posts.filter((post) => post._id !== id))
            }
        } catch (error) {
            console.log(error)
        }



    }
    //Hace la peticion PUT al backend para actualizar una publicacion
    const updatePost = async (id, post) => {
        try {
            const res = await putPostRequest(id, post);
            console.log(res.data)
            setPosts(posts.map((post) => (post._id === id ? res.data : post)));

        } catch (error) {
            console.error(error);
        }
    };

    //Peticion GET a single post

    const getPost = async (id) => {
        const res = await getPostRequest(id)
        return res.data
        //console.log(res) 
    }

    //Llamamos useEffect para poder recuperar los posts por medio del contexto, le enviamos un arreglo vacio al segundo parametro porque no lo usamos.
    useEffect(() => {
        getPosts()
    }, [])
    console.log(posts)


    //Context Provider
    return <postContext.Provider value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost
    }}>
        {children}
    </postContext.Provider>

}