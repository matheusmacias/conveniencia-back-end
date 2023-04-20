import HttpStatus from 'http-status-codes';

export class CustomError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }

    static notFound(message: string): CustomError {
        return new CustomError(HttpStatus.NOT_FOUND, message);
    }

    static internalServerError(message: string): CustomError {
        return new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(HttpStatus.UNAUTHORIZED, message);
    }
}
