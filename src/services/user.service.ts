import { User } from '../models/user.model';
import HttpStatus from 'http-status-codes';
import bcrypt, { hash } from 'bcrypt';

import IResult from '../interfaces/IResults.interface';

class UserService {
    async logIn(email: string, password: string): Promise<IResult> {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Conta não foi encontrada!',
                };
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Senha inválida, tente outra!',
                };
            }
            return {
                status: HttpStatus.OK,
                message: 'Logado com sucesso!',
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Opss!! não foi possível entrar!',
            };
        }
    }

    async signup(name: string, email: string, password: string): Promise<IResult> {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'E-mail informado já possuiu um cadastro, tente outro!',
                };
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
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Opss!! não foi possível criar a conta',
            };
        }
    }
}

export default new UserService();