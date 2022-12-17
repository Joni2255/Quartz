import Sequelize from 'sequelize'
import db from '../config/db.js'

const Bateria = db.define('bateria', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	voltaje_bateria: {
		type: Sequelize.INTEGER
	},
	amperios_hora: {
		type: Sequelize.INTEGER
	},
	precio_bateria: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'baterias'
})

export default Bateria