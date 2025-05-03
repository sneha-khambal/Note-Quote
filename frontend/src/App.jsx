import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { CreateBook } from './pages/CreateBook';
import { DeleteBook } from './pages/DeleteBook';
import { EditBook } from './pages/EditBook';
import { HomeBook } from './pages/HomeBook';
import { ShowBook } from './pages/ShowBook';
import { ListComponent } from './pages/ListComponent';
import { CardComponent } from './pages/CardComponent';


 const App = () => {
  return (

    <div className='min-h-screen bg-white-100 p-6'>
      <Routes>
      <Route path='/' element={<HomeBook/>}/>
  
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
    </Routes>
    </div>
   )
}

export default App;