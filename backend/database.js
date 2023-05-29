  import mongoose from "mongoose";
  import {URI} from './config.js'

  export async function databaseConnection(){
    try{
        const  db = await mongoose.connect(URI, {
            useNewUrlParser:true,
        });

        console.log("Connection to ", db.connection.name);
        
    } catch (error){
        console.error(error)
    }
  }