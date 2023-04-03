import sequelize from './src/config/sequelize';
import { User } from './src/models/user.model';

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await User.sync({alter: true});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();