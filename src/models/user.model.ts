import { Model, DataTypes } from "sequelize";

import sequelize from '../config/sequelize';

export class User extends Model{
    public id!:number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: [0, 50],
        },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          len: [5, 150],
        },
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          len: [8, 256],
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: true,
    }
  );
  