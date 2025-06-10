import express from 'express';
import {
    Book
} from '../model/bookModel.js';
const router = express.Router();
import upload from '../utils/storage.js';


router.get('/', (req, res) => {
    return res.status(234).send('Welcome to MERN project.')
});

// create Book and  no dublicate books will be added  
router.post('/createBook', upload.single('image'), async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.script) {
            return res.status(400).send({
                message: 'all required fields should be added.'
            })

        }

        const dublicateEntry = await Book.findOne({
            title: req.body.title.toLowerCase()
        });

        if (dublicateEntry) {
            return res.status(400).send({
                data: 'Book already present with same name.'
            })
        }

        const imageUrl = req.file ?.path || '';

        const newBook = {
            title: req.body.title.toLowerCase(),
            author: req.body.author,
            script: req.body.script,
            image: imageUrl
        }
        const book = await Book.create(newBook);
        // console.log(book)
        res.status(201).send({
            data: 'Created Successfully !'
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            error: error.message
        })
    }
});

// get all books record
router.get('/getAllBooks', async (req, res) => {
    try {
        const allBooks = await Book.find();


        if (allBooks.length === 0) {
            return res.status(204).send(); // No Content
        } else {
            res.status(200).send(allBooks)
        }
    } catch (error) {
        return res.status(400).send({
            'error': error.message
        })
    }
});

// get book by Id;
router.post('/getSingleBook/:id', async (req, res) => {

    try {
        const paramId = req.params.id;
        const authId = await Book.findById(paramId);
        if (!authId) {
            return res.status(404).send({
                message: 'No book found with given Id'
            });
        };

        return res.status(200).send(authId)
    } catch (error) {
        return res.status(500).send({
            'error': error.message
        })
    }



});

// update book by given id 
router.put('/updateBook/:id', upload.single('image'), async (req, res) => {
    try {
        const paramId = req.params.id;
        const updateBookData = {
            title: req.body.title ?.toLowerCase(),
            author: req.body.author,
            script: req.body.script
        };

        // 👇 This is what was missing
        // if (req.file && req.file.filename) {
        //   const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        //   updateBookData.image = imageUrl;
        // } 
        console.log("Cloudinary File:", req.file);

        if (req.file && req.file.path) {
            updateBookData.image = req.file.path;
        }
        const updatedData = await Book.findByIdAndUpdate(paramId, updateBookData, {
            new: true,
            runValidators: true
        });
        if (!updatedData) {
            return res.status(404).send({
                message: 'No book found with given Id'
            });
        };
        res.status(200).send({
            data: 'Updated Successfully !'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            'error': error.message
        })
    }
})

// delete the book by given id 
router.delete('/deleteBook/:id', async (req, res) => {

    try {
        const reqId = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(reqId);
        if (!deleteBook) {
            return res.status(400).send({
                'message': 'Book no found by given Id'
            })
        }

        return res.status(200).send('Book deleted Successfully.')
    } catch (error) {
        return res.status(500).send({
            'error': error.message
        })
    }
});

//  delete all data in one
router.delete('/deleteAllBooks', async (req, res) => {

    try {

        const deleteBook = await Book.deleteMany({});
        if (!deleteBook) {
            return res.status(400).send({
                'message': 'There is no data to delete'
            })
        }

        return res.status(200).send('All Book deleted Successfully.')
    } catch (error) {
        return res.status(500).send({
            'error': error.message
        })
    }
});


export default router;