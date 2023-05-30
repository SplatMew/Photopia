import toast from 'react-hot-toast'
import { usePosts } from '../context/postContext.js'
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from './errorToast.js'

export function NewPostCard({ post }) {

  const { deletePost } = usePosts()
  const navigate = useNavigate()


  //Funcion para eliminar la publicacion
  const handleDelete = (_id) => {
    toast((t) => (
      <div>
        <p>
          <b>
            Do you want to delete this post?
          </b>
        </p>
        <div>
          <button className='bg-red-500 hover:bg-red-400 px-3 py-3 text-white rounded-sm mx-2'
            onClick={() => {
              try {
                deletePost(_id);
                toast.dismiss(t.id);
              } catch (error) {
                console.log(error)
                toast.dismiss(t.id);
                ErrorToast()
              }
            }}> Delete </button>

          <button className='bg-green-600 hover:bg-green-500 px-3 py-3 text-white rounded-sm mx-2'
            onClick={() => toast.dismiss(t.id)}>  Cancel
          </button>
        </div>
      </div>
    ))
  }

  return (
    <div className='bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer'
    /*onClick={() => navigate(`/posts/${post._id}`)}*/
    >

      <div className="px-2 py-7">
        <div className="flex justify-between text-yellow-300">
          <h3>
            {post.title}
          </h3>
          <button className='bg-red-600 text-sm px-2 py-1 rounded-sm hover:bg-red-400'
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id)
            }}>
            Delete
          </button>
        </div>
        <p>
          {post.description}
        </p>

      </div>

      {post.image && <img src={post.image.url} className=' w-96 h-64 ' />}
    </div>
  )
}
