import React, { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BackButton } from '../components/BackButton';
import readImage from '../assets/read-7577787_1280.jpg'; //

export const ShowBook = ({onDataLoad}) => {
const [bookDetails,setBookDetails]  = useState();
const [loading,setLoading]  = useState(true);
const [internalError,setInternalError]  = useState(true);
const {id} = useParams()

useEffect(()=>{
if(bookDetails == undefined ){
  setLoading(true);

  axios.post(`http://localhost:3000/Books/getSingleBook/${id}`)
  .then((response)=>{
  setLoading(false);
  setInternalError('') 
  setBookDetails(response.data)
  onDataLoad ? onDataLoad() :'';
  })
  .catch((error)=>{
    console.log(error);
    setLoading(false)
    setInternalError("Something went wrong. Try after sometime.");
   
  
     
  })
}
},[bookDetails])
// console.log(bookDetails.title)
console.log(loading)
  return (
   <div>
    {loading?
    <div>
        <BackButton   />
    <Spinner/>
    </div>
  :
  <div>
 
  <BackButton   />
 
 
  <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-6 mt-6">
  {internalError != '' ?
     <p className='text-center text-red-600 font-bold responseText'>{internalError}</p>
     :
      <div className="w-full h-full flex flex-col lg:flex-row">
    
        {/* Image side */}
        <div 
          className="h-1/2 lg:h-full lg:w-1/2 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden shadow-lg"
          style={{ backgroundImage: `url(${readImage})` }}
          title="Man holding a book"
        >
        </div>

        {/* Content side */}
        <div className="w-full h-1/2 lg:h-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal shadow-lg">
          <div className="mb-8 overflow-visible overflow-x-hidden">
            <p className="text-sm text-gray-600 flex items-center"></p>
            <div className="text-gray-900 font-bold text-3xl mb-4 capitalize">{bookDetails.title}</div>
            <p className="text-gray-700 text-lg">{bookDetails.script}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <span className="text-gray-600   flex"><p className='font-bold'>Author</p>: {bookDetails.author}</span>
              <span className="text-gray-600 flex"><p className='font-bold'>Publish Year</p>: {bookDetails.publishYear}</span>
            </div>
          </div>
        </div>
    
      </div>
}
    </div>

</div>}
   </div>
  )
}
