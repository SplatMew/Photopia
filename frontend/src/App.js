import {Toaster} from 'react-hot-toast'
import './App.css';
import { HomePage, NotFound, PostsForm } from './pages/pages.js'
import {PostProvider} from './context/postContext.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <PostProvider>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/new' element={<PostsForm />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/posts/:id' element={<PostsForm/>}/>
            </Routes>
            <Toaster/>
          </Router>
        </PostProvider>
      </div>
    </div>

  )
}

export default App;
