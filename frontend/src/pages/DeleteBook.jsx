import React, { useState } from 'react';
import { Spinner } from '../components/Spinner';
import { ShowBook } from './ShowBook';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';
import { BackButton } from '../components/BackButton';
import { DeleteAlertComponent } from 'frontend\src\components\DeleteAlertComponent.jsx';
 
 

export const DeleteBook = ({REACT_BASE_URL}) => {
  const [deleteBook,setDeleteBook] = useState('');
  const [confirm,setOnConfirm] = useState(false);
  const [showBox,setShowBox] = useState(false);
  const [disable,setDisable] = useState(true);
  const[interalError,setInternalError] = useState('')
  const {id} = useParams();
  const navigate = useNavigate();

  const deleteFunction =()=>{
    setOnConfirm(false)
 try {
     axios.delete(`${REACT_BASE_URL}/Books/deleteBook/${id}`)
    .then((response)=>{
setOnConfirm(true);
setShowBox(false)
setDeleteBook(response.data);
setInternalError('')
navigate('/')

    })
    .catch((error)=>{
      setDeleteBook(error.response.data)
      setOnConfirm(false);
      setShowBox(false)
      setInternalError("Something went wrong. Try after sometime.");
      setTimeout(() => {
        setInternalError('')
      }, 2000);


  })
 } catch (error) {
  console.log(error)
 }

  }

  const onConfirm =()=>{
   setShowBox(true);
    
  }
  const onCancel =()=>{
    setShowBox(false)

  }
  return (
    <div className='text-gray-700 '>
  
 <button className="flex bg-red-700 rounded px-3 py-3 text-white w-[120px] font-bold justify-center float-right mb-5 cursor-pointer" disabled={disable}   onClick={()=>{onConfirm()}}>
    Delete
  </button>
  {interalError != '' ?
     <span className=' absolute  text-red-600 font-bold top-6 left-1/2 -translate-x-1/2  '>{interalError}</span>
     :
     <DeleteAlertComponent onCancel={onCancel} deleteFunction={deleteFunction} showBox={showBox} message={'You want to Delete this Book ?'}/>

     }
     <ShowBook onDataLoad={()=>setDisable(false)} REACT_BASE_URL={REACT_BASE_URL}  error={interalError} />
 
    

   

    </div>
  )
}
