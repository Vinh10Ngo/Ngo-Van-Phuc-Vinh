import mongoose from 'mongoose';
import { envConfigs } from './envConfigs';
import logger from '../lib/logger';

// npm i @types/mongoose

interface connectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    useFindAndModify : boolean;
} 

const connectOptions: connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
};

const MONGO_URI: string = `mongodb+srv://${envConfigs.database.username}:${envConfigs.database.password}@cluster0.1r1zsfn.mongodb.net/${envConfigs.database.database}?retryWrites=true&w=majority`

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

db.on('error', (error) => {
    logger.error("Mongodb :: connected"  + error)
    mongoose.disconnect();
});

db.on('connected', () => {
    logger.info("database connected");
});

