import { sequelize } from "../src/config/sequelize";

console.log("modo: test");

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
  