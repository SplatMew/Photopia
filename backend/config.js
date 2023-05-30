import dotenv from 'dotenv';
dotenv.config();

export  const URI = process.env.MONGODB_URI 
                    ? process.env.MONGODB_URI
                    : 'mongodb://127.0.0.1/databasetest';

export const URI2 = process.env.REPLICA_URI
                    ? process.env.REPLICA_URI
                    : 'mongod://127.0.0.1/databasereplicatest'

export const PORT = process.env.PORT
                    ? process.env.PORT
                    : 5000;
