import HttpStatus from 'http-status-codes';
import { CustomError } from '../err/custom.err';
import IError from '../interfaces/IError.interface';

export function handleError(error: any, customMessage?: string): IError {
    if (error instanceof CustomError) {
        return { status: error.status, message: error.message }
    }
    return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: customMessage || "Houve um erro inesperado, tente novamente!"
    };
}
