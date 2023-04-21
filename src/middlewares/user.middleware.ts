import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import IError from '../interfaces/IError.interface';

const userSchema = z.object({
    name: z.string()
        .min(8, 'O nome deve ter no mínimo 8 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres'),
    email: z.string()
        .email('O email deve ser válido'),
    password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).+$/, 'A senha deve ter pelo menos uma letra maiúscula, um caractere especial, um número e uma letra minúscula'),
});

type User = z.infer<typeof userSchema>;

export const validateUserReg = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = userSchema.parse(req.body);
        req.body = user;
        next();
    } catch (err: any) {
        const { message } = JSON.parse(err.message)[0];
        const error: IError = {
            status: HttpStatusCode.InternalServerError,
            message,
        };
        next(error);
    }
};