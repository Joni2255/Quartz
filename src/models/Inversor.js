import Sequelize from 'sequelize'
import db from '../config/db.js'

const Inversor = db.define('inversor', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	watts_inversor: {
		type: Sequelize.INTEGER
	},
	voltaje_inversor: {
		type: Sequelize.INTEGER
	},
	precio_inversor: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'inversores'
})

export default Inversor