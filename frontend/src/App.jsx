import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { CreateBook } from './pages/CreateBook';
import { DeleteBook } from './pages/DeleteBook';
import { EditBook } from './pages/EditBook';
import { HomeBook } from './pages/HomeBook';
import { ShowBook } from './pages/ShowBook';
// const url = import.meta.env.VITE_BASE_URL ;
const url =   'http://localhost:5000';

 const App = () => {
console.log(url)
  return (

    <div className='min-h-screen bg-white-100 p-6'>
      <Routes>
      <Route path='/' element={<HomeBook REACT_BASE_URL={url} />}/>
  
      <Route path='/books/create' element={<CreateBook REACT_BASE_URL={url} />}/>
      <Route path='/books/delete/:id' element={<DeleteBook REACT_BASE_URL={url} />}/>
      <Route path='/books/edit/:id' element={<EditBook REACT_BASE_URL={url} />}/>
      <Route path='/books/details/:id' element={<ShowBook REACT_BASE_URL={url} />}/>
    </Routes>
    </div>
   )
}

export default App;