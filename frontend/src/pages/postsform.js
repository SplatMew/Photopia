import { useEffect, useState } from 'react'
import { usePosts } from '../context/postContext.js'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import * as Yup from 'yup'

export function PostsForm() {

  const { createPost, getPost, updatePost } = usePosts()

  const navigate = useNavigate()

  const params = useParams()

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null
  })

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
        });
      }
    })();
  }, [params.id, getPost]);


  return (
    <div>
      {/* Formik es una libreria que nos simplifica el uso de formularios, 
      ya cuenta con diferentes modulos para detectar errores en el formulario, 
      tener un schema del mismo, etc.*/}

      <Formik initialValues={post}
        enableReinitialize={true}

        /*Para el validation Schema utilizamos Yup, otra libreria que comunmente se 
          utiliza con Formik, y, como un model schema, nos permite especificar parametros\
          para los campos del formulario*/
          
        validationSchema={Yup.object({
          title: Yup.string().required('Post Author is required').max(20),
          description: Yup.string().required('Post description is required.').max(40)
        })}

        onSubmit={async (values, actions) => {

          if (params.id) {
            await updatePost(params.id, values)

          } else {
            await createPost(values)
          }
          actions.setSubmitting(false)
          setTimeout(2000)
          navigate('/')
        }}

      >

        {({ handleSubmit, setFieldValue, isSubmitting }) => (

          <Form onSubmit={handleSubmit}>
            <div className="text-white text-sm">
              Name
            </div>

            <Field
              name='title'
              placeholder="Your Name here!"
              className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' />
            <div className="text-amber-100 text-sm">
              20 Max. Characters
            </div>
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name='title' />

            <div className="text-white text-sm mt-5">
              Description
            </div>
            <Field
              name='description'
              placeholder="Your Post Description"
              className='px-3 py-10 focus:outline-none rounded bg-gray-600 text-white w-full' />

            <div className="text-amber-100 text-sm">
              40 Max. Characters
            </div>
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name='description' />


            <label htmlFor='Image'
              className='text-sm block font-bold text-gray-400'>
              <input type="file"
               name='image' 
               className='px-3 py-2 focus:outline-none rounded text-white w-full'
               onChange={(e) => setFieldValue('image', e.target.files[0])} />
            </label>

            <button className='text-white bg-teal-500 px-5 py-1 mt-5 ' type="submit" disabled={isSubmitting}>
              {isSubmitting? (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
              ) : 'Post'}
            </button>
          </Form>
        )}

      </Formik>
    </div>
  )
}
