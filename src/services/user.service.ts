import { User } from '../models/user.model';
import HttpStatus from 'http-status-codes';
import bcrypt, { hash } from 'bcrypt';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import jwt from  'jsonwebtoken';

import IResult from '../interfaces/IResults.interface';
import { CustomError } from '../err/custom.err';
import { handleError } from '../err/handle.err';

dotenv.config();

// process.env.PORT

@injectable()
export default class UserService {


    async logIn({ email, password }: { email: string, password: string }): Promise<IResult & {token?: string}> {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw CustomError.notFound('Conta não foi encontrada!');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw CustomError.notFound('Senha inválida, tente outra!');
            }
            const secret = process.env.JWT_SECRET;
            if(!secret){
                throw CustomError.internalServerError('Houve um erro na autenticação');
            }
            const { email:_email, name: _name } = user;
            const token = jwt.sign({_email, _name}, secret, { expiresIn: 6000 });
            return {
                status: HttpStatus.OK,
                message: 'Logado com sucesso!',
                token
            };
        } catch (error) {
            console.log(error);
            return handleError(error);
        }
    }

    async signup({name, email, password}: {name: string, email: string, password: string}): Promise<IResult & {token?: string}> {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                throw CustomError.internalServerError('E-mail informado já possuiu um cadastro, tente outro!');
            }
            password = await hash(password, 10);
            const reg_user = await User.create({
                name,
                email,
                password,
            });
            const { email:_email, name: _name } = reg_user;

            const secret = process.env.JWT_SECRET;
            if(!secret){
                throw CustomError.internalServerError('Houve um erro na autenticação');
            }
            const token = jwt.sign({_email, _name}, secret, { expiresIn: 6000 });
            return {
                status: HttpStatus.OK,
                message: 'Conta criada com sucesso!',
                token
            };
        } catch (error) {
            console.log(error);
            return handleError(error);
        }
    }
}