import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        script:{
            type:String,
            required:true
        }
        ,
        image:{ 
            type:String,
            required: false
        }

    },
    {timestamps:true}

)

export const Book = mongoose.model('book',bookSchema)