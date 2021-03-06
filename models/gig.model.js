import Sequelize from 'sequelize';
import database from '../lib/db';

// TODO vardi, paagan, m/f, location, type, details
export default database.define('Gig', {
  date: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    validate: {
      isBoolean: true,
    },
  },
  compensation: {
    type: Sequelize.DOUBLE,
    validate: {
      isNumeric: true,
    },
  },
  contactEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  dancersRequested: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
    },
  },
});
