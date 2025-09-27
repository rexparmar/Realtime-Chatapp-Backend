import mongoose from "mongoose";

// function to connect to db
export const connectDB = async () =>{
    try{
        mongoose.connection.on('Connected', ()=> console.log("db connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    }catch(error){
        console.log(error)
    }
}