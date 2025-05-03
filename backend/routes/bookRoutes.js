import express from 'express';
import { Book } from '../model/bookModel.js';
const router = express.Router();

router.get('/',(req,res)=>{
    return res.status(234).send('Welcome to MERN project.')
});

// create Book and  no dublicate books will be added  
router.post('/createBook',async(req,res)=>{
try {
    if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.script ){
     return   res.status(400).send({message:'all required fields should be added.'})

    }

    const dublicateEntry = await Book.findOne({ title: req.body.title.toLowerCase() });

    console.log('dublicateEntry'+ dublicateEntry)
    if(dublicateEntry){
        return res.status(400).send({data:'Book already present with same name.'})
    }

    const newBook = {
        title :req.body.title.toLowerCase() ,
        author:req.body.author ,
        script:req.body.script ,
        publishYear:req.body.publishYear
    }
    const book = await Book.create(newBook);
    console.log(book)
    res.status(201).send({data:'Created Successfully !'})

} catch (error) {
    console.log(error.message)
    res.status(500).send({error:error.message})
}
});

// get all books record
router.get('/getAllBooks',async(req,res)=>{
   try {
    const allBooks = await Book.find();
     
   
    if (allBooks.length === 0) {
        return res.status(204).send(); // No Content
      }else{
        res.status(200).send(allBooks)
      }
   } catch (error) {
    return res.status(400).send({'error':error.message})
   }
});

// get book by Id;
router.post('/getSingleBook/:id',async(req,res)=>{

try {
    const paramId = req.params.id;
    const authId = await Book.findById(paramId);
    if(!authId){
        return res.status(404).send({message:'No book found with given Id'});
    };

    return res.status(200).send(authId)
} catch (error) {
    return res.status(500).send({'error':error.message})
}

    

});

// update book by given id 
router.put('/updateBook/:id',async(req,res)=>{
    try {
        const paramId = req.params.id;
        const updateBookData = req.body;
        const updatedData = await Book.findByIdAndUpdate(paramId,updateBookData,{
            new:true,
            runValidator:true
          } );
        if(!updatedData){
            return res.status(404).send({message:'No book found with given Id'});
        };
        res.status(201).send({data:'Updated Successfully !'})
    } catch (error) {
        return res.status(500).send({'error':error.message})
    }
})

// delete the book by given id 
 router.delete('/deleteBook/:id',async(req,res)=>{

try {
    const reqId = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(reqId);
    if(!deleteBook){
        return res.status(400).send({'message':'Book no found by given Id'})
    }

    return res.status(200).send('Book deleted Successfully.')
} catch (error) {
    return res.status(500).send({'error':error.message})
}
 });

//  delete all data in one
router.delete('/deleteAllBooks',async(req,res)=>{

    try {
        
        const deleteBook = await Book.deleteMany({});
        if(!deleteBook){
            return res.status(400).send({'message':'There is no data to delete'})
        }
    
        return res.status(200).send('All Book deleted Successfully.')
    } catch (error) {
        return res.status(500).send({'error':error.message})
    }
     });


 export default router;