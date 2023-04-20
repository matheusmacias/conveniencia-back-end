import express, { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { Container } from 'inversify';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import IError from './interfaces/IError.interface';
import Routes from './routes/_routes';
import container from './inject/container';

class App {
    public express: express.Application;

    public constructor(private readonly _container: Container){
        this.express = express();
        this.setMiddlewares();
        this.routes();
        this.setCors();
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
    }

    private routes(){
        const routes = this._container.resolve<Routes>(Routes).router;
        this.express.use('/', routes);
    }

    private setMiddlewares(){
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(morgan('dev'));
    }

    private setCors() {
        const corsOptions = {
          origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
          credentials: true,
          maxAge: 86400,
          preflightContinue: false,
          optionsSuccessStatus: 200,
        };
        this.express.use(cors(corsOptions));
    }

    private errorHandlerNotFound(req: Request, res: Response, next: NextFunction) {
        const error: IError = {
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found'
        };
        next(error);
    }

    private errorHandler(error: IError, req: Request, res: Response, next: NextFunction) {
        res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        return res.json({
            status: error.status,
            message: error.message
        });
    }
}

export default new App(container).express;
