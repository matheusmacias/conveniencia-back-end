import sequelize from '../src/config/sequelize';
import { User } from '../src/models/user.model'

console.log("modo: test");

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// (async ()=>{
//   await User.create({
//     'name':'testttttttttttttt',
//     'email':'testttttttttttt',
//     'password':'testtttttttt',
//   });
// })()