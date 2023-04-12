import { User } from '../models/user.model';
import HttpStatus from 'http-status-codes';
import bcrypt, { hash } from 'bcrypt';

import IResult from '../interfaces/IResults.interface';
import { CustomError } from '../err/custom.err';
import { handleError } from '../err/handle.err';

class UserService {
    async logIn(email: string, password: string): Promise<IResult> {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw CustomError.notFound('Conta não foi encontrada!');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw CustomError.notFound('Senha inválida, tente outra!');
            }
            return {
                status: HttpStatus.OK,
                message: 'Logado com sucesso!',
            };
        } catch (error) {
            console.log(error);
            return handleError(error);
        }
    }

    async signup(name: string, email: string, password: string): Promise<IResult> {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                throw CustomError.internalServerError('E-mail informado já possuiu um cadastro, tente outro!');
            }
            password = await hash(password, 10);
            await User.create({
                name,
                email,
                password,
            });
            return {
                status: HttpStatus.OK,
                message: 'Conta criada com sucesso!',
            };
        } catch (error) {
            console.log(error);
            return handleError(error);
        }
    }
}

export default new UserService();