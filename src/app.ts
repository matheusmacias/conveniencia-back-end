import express, { Application, NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import IResult from './interfaces/IResults.interface';

class App {
    public express: Application;

    public constructor(){
        this.express = express();
        this.setCors();
        this.setMiddlewares();
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
    }

    private setMiddlewares(){
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(morgan('dev'));
    }

    private setCors() {
        const corsOptions = {
          origin: ['http://localhost:4000', 'http://127.0.0.1:4000'],
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
        const error: IResult = {
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found'
        };
        next(error);
    }

    private errorHandler(error: IResult, req: Request, res: Response, next: NextFunction): any {
        res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        return res.json({
            status: error.status,
            message: error.message
        });
    }
}

export default new App().express;
