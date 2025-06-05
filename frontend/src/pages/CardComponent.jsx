import React, { useContext } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import { CreateNewEntryComponent } from '../components/CreateNewEntryComponent';

export const CardComponent = ({books,internalError}) => {
  return (
 
  <div className='grid grid-cols-1  gap-4 '>
  {
    books.length > 0       ?  books?.slice() // create a shallow copy to avoid mutating original
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((book,index)=>(
          <div className="relative rounded overflow-hidden shadow-sm mr-5 border-gray  grid grid-row-2" key={index} >
                 
          {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"></img> */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 capitalize" >{book.title}</div>
            <p className="text-gray-700 text-sm overflow-y-auto h-[100px] pr-2">
             {book.script}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-green-200 mr-2 mb-2">Author: {book.author}</span>
            <span className="inline-block bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-blue-200 mr-2 mb-2">Date:  {book.updatedAt.split("T")[0]}</span>
            <div className='block xs:float-none sm:float-right lg:float-right px-3 py-1 mr-2 mb-2'>
                       <Link to={`books/delete/${book._id}` }>
                            <MdOutlineDelete size={20} className='text-red-600 text-2xl inline mr-2 ' />
                            </Link>
                            <Link to={`books/edit/${book._id}`}>
                            <AiOutlineEdit size={20} className='text-yellow-600 text-2xl inline mr-2' />
                            </Link>
                            <Link  to={`books/details/${book._id}`}>
                            <BsInfoCircle size={20} className='text-green-600 text-2xl inline' />
                            </Link>
                       </div>
          </div>
        </div>
      ))
      :
          <CreateNewEntryComponent internalError={internalError}/>
      
  }
  </div>
 
  )
}
