import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



export function ErrorToast() {

  const navigate = useNavigate();

  toast((t) => (
    <div>
      <p>
        Something went wrong, please. Try again later!
      </p>
      <div>
        <button className='bg-yellow-300 hover:bg-yellow-100 px-3 py-3 text-black rounded-sm mx-2'
          onClick={() => { navigate('/'); toast.dismiss(t.id); }} >  OK.</button>
      </div>
    </div>
  ))
}