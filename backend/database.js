  import mongoose from "mongoose";
  import {URI, URI2} from './config.js'
  import postModel from './models/post.js'

  export async function databaseConnection(){
    try{
        const  db = await mongoose.createConnection(URI, {
            useNewUrlParser:true,
        });

        const replica = await mongoose.createConnection(URI2, {
              useNewUrlParser:true,
        });

        //console.log("Connection to ", db.connection.name);
        //console.log("Connection to ", replica.connection.name);
        
    } catch (error){
        console.error(error)
    }

    dbReplication();
  }

  export async function dbReplication(){
    const changeStream = postModel.watch();

    changeStream.on('change', async (change) => {
      try{
        if(change.operationType === 'insert'){
          const insertedPost = change.fullDocument;
          await replica.connection.db.collection('postModel').insertOne(insertedPost)
        } else if (change.operationType === 'delete'){
          const deletedPostid = change.documentKey._id;
          await replica.connection.db.collection('postModel').deleteOne({_id: deletedPostid})

        }
      }catch(error){
        console.error('Error replicating:', error);
      }
    })

  }