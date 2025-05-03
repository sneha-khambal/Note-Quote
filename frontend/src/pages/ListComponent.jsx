import React, { useContext } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import { CreateNewEntryComponent } from '../components/CreateNewEntryComponent';

export const ListComponent = ({books,internalError} ) => {
//    const {books} = useParams()
    console.log(books)
  return (
  
 
 <div>
      {books.length > 0 ?
    <table className='w-full border-separate border-spacing-2 bg-gray-100 p-6 h-auto'>
    <thead>
        <tr>
            <th className='border border-slate-600 rounded-md'>No.</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
            <th className='border border-slate-600 rounded-md '>Operations</th>
        </tr>
    </thead>
    <tbody>
     {  books?.map((book,index)=>(
        
        <tr key={book._id} className='h-8'>
            <td className=' border border-slate-700 rounded-md text-center'>
                {index+1}
            </td>
            <td className='capitalize border border-slate-700 rounded-md text-center'>
                {book.title}
            </td>
            <td className=' border border-slate-700 rounded-md text-center max-md:hidden'>
                {book.author}
            </td>
            <td className=' border border-slate-700 rounded-md text-center max-md:hidden'>
                {book.publishYear}
            </td>
            <td className=' border border-slate-700 rounded-md text-center  '>
             <div className='flex justify-center lg:gap-x-4 gap-x-1'>
             <Link to={`books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-red-600 text-2xl' />
                  </Link>
                  <Link to={`books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-yellow-600 text-2xl' />
                  </Link>
                  <Link to={`books/details/${book._id}`}>
                  <BsInfoCircle className='text-green-600 text-2xl' />
                  </Link>
             </div>
            </td>
        </tr>


     ))}
    </tbody>
   </table> 
    :  
   <CreateNewEntryComponent internalError={internalError} />
   }
 
</div>
  )
}
