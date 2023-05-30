
import { usePosts } from '../context/postContext.js'
import { RiChatNewLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { NewPostCard } from '../components/newPostCard.js'

export function HomePage() {

  const { posts } = usePosts()

  if (posts.length === 0) return (

    <div className='flex flex-col justify-center items-center'>
      <img src="https://res.cloudinary.com/ddi8xaplx/image/upload/v1685474488/photopia_logo_l5gdlf.png" className=' w-96 h-50' />

      <RiChatNewLine className='w-48 h-48 text-white mt-20' />

      <h1 className='text-white'>
        No posts yet
      </h1>

      <Link className='text-yellow-300 mb-10' to="/new">
        Create new post
      </Link>

    </div>
  )

  return (
    <div className='flex flex-col justify-center 
                    items-center text-white'>
                      
      <img src="https://res.cloudinary.com/ddi8xaplx/image/upload/v1685474488/photopia_logo_l5gdlf.png" className=' w-96 h-50' />
      <Link to="/new" className='text-yellow-300 mb-10 mt-10'>
        Create new post
      </Link>

      <div className='grid grid-cols-1' style={{ gridGap: 50 }}>
        {posts.reverse().map(post => (
          <NewPostCard post={post} key={post._id} />
        ))}
        
      </div>
    </div>
  )
}
