import Sequelize from 'sequelize'
import db from '../config/db.js'

const Panel = db.define('panel', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	voltaje_panel: {
		type: Sequelize.INTEGER
	},
	watts_panel: {
		type: Sequelize.STRING(15)
	},
	tamano_panel: {
		type: Sequelize.STRING(15)
	},
	precio_panel: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'paneles'
})

export default Panel