import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa';
import { useParams,useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';


export const CreateBook = ({bookDetail}) => {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm( );
  const [responseData,setResponseData] = useState('');
const {id} = useParams();
const [internalError,setInternalError] = useState('')
const [error,setError] = useState('')

  useEffect(() => {
  if(bookDetail){
    reset(bookDetail)
  }
  }, [bookDetail]);

 
  
  const onSubmit = data => {
    if(bookDetail){
   

    axios.put(  `http://localhost:3000/Books/updateBook/${id}`,data)
    .then((response)=>{
      console.log(response.data);
      setInternalError('')
      setError('')
      setResponseData(response.data.data);
     

      
    })
    .catch((error)=>{
      console.log(error)
      setResponseData('')
      setInternalError("Something went wrong. Try after sometime.");
      // setTimeout(() => {
      //   setInternalError('')
      // }, 2000);



    })
  }
  else{
    axios.post( `http://localhost:3000/Books/createBook`,data)
    .then((response)=>{
      console.log(response.data.data)
      setInternalError('')
      setError('')
      setResponseData(response.data.data)
      setInternalError('')

      reset();
      // navigate('/');

      
    })
    .catch((error)=>{
      console.log(error)
      setResponseData('')
      setInternalError("Something went wrong. Try after sometime.");
      // setTimeout(() => {
      //   setInternalError('')
      // }, 2000);

    })
  }


}

useEffect(()=>{
  console.log(Object.keys(errors).length)
  if(Object.keys(errors).length >0){
    setResponseData('')
    setInternalError('')
    setError('Enter Required Data.')
  }
  else{
    setError('')
  }
})
 
console.log(bookDetail)
console.log(responseData)

  return (
    
<div>
{<BackButton destination={ `/`}  /> }
  
<p className={ 'text-center text-red-600 font-bold responseText'}>{error}</p> 
<p className={responseData && bookDetail ? 'text-center text-blue-600 font-bold':'text-center text-green-600 font-bold responseText'}>{responseData}</p>  

{internalError != '' && Object.keys(errors).length == 0 ? <p className='text-center text-red-600 font-bold responseText'>{internalError}</p>:''}
   <div className=" p-6 bg-gray-100 p-4 mt-6">
   <form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
>
  <h2 className=  {bookDetail ? "text-2xl font-bold mb-6 text-center text-blue-700" : "text-2xl font-bold mb-6 text-center text-green-700"}>
    {bookDetail ? 'Edit Book' : 'Create Book'}
  </h2>

  {/* Title Field */}
  <div className="mb-4">
    <input
      {...register('title', { required: 'Title is required' })}
      type="text"
      placeholder="Title"
      className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.title && (
      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
    )}
  </div>

  {/* Script Field */}
  <div className="mb-4">
    <textarea
      {...register('script', { required: 'Script is required' })}
      placeholder="Script"
      rows="5"
      className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
    {errors.script && (
      <p className="text-red-500 text-sm mt-1">{errors.script.message}</p>
    )}
  </div>

  {/* Author Field */}
  <div className="mb-4">
    <input
      {...register('author', { required: 'Author is required' })}
      type="text"
      placeholder="Author"
      className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.author && (
      <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
    )}
  </div>

  {/* Publish Year Field */}
  <div className="mb-4">
    <input
      {...register('publishYear', { required: 'PublishYear is required' })}
      type="number"
      placeholder="Publish Year"
      className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.publishYear && (
      <p className="text-red-500 text-sm mt-1">{errors.publishYear.message}</p>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
   className = {bookDetail ? "w-full bg-blue-600 text-white py-3 rounded-xl   transition duration-200 cursor-pointer" : "w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer  transition duration-200"}
 
  >
    {bookDetail ? 'Edit' : 'Create'}
  </button>
</form>


   </div>
</div>
 
  )
}
