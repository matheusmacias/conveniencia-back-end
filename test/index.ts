// import sequelize from '../src/config/sequelize';
// import { User } from '../src/models/user.model'

// console.log("modo: test");

// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexão com o banco de dados estabelecida com sucesso!');
//   })
//   .catch(err => {
//     console.error('Erro ao conectar com o banco de dados:', err);
//   });

// (async ()=>{
//   await User.create({
//     'name':'testttttttttttttt',
//     'email':'testttttttttttt',
//     'password':'testtttttttt',
//   });
// })()

import { z } from 'zod';

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

const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'Test@123',
  };
  
  try {
    userSchema.parse(user);
    console.log('Usuário válido!');
  } catch (error:any) {
    console.error('Erro de validação do usuário:', error.message);
  }