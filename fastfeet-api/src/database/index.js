import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipient, Courier, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    // .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
