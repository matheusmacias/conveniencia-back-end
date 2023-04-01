import express, { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import IResult from './interfaces/IResults.interface';
import routes from './routes/routes';

class App {
    public express: express.Application;

    public constructor(){
        this.express = express();
        this.setMiddlewares();
        this.routes();
        this.setCors();
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
    }

    private routes(){
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
        const error: IResult = {
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found'
        };
        next(error);
    }

    private errorHandler(error: IResult, req: Request, res: Response, next: NextFunction) {
        res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        return res.json({
            status: error.status,
            message: error.message
        });
    }
}

export default new App().express;
