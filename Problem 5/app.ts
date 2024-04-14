import express from 'express';
import Middleware from './app/configs/middleware';
import Routes from './app/router/index';
import ErrorHandler from './app/middleware/error'

class App {
    public app : express.Application;

    constructor() {
        this.app = express();
        Middleware.init(this);
        Routes.init(this);
        ErrorHandler.init(this);
    }
}

export default new App().app;