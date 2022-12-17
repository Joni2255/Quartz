import Sequelize from 'sequelize'
import db from '../config/db.js'
import UsuarioConfiguracion from './UsuarioConfiguracion.js'

const Artefacto = db.define('artefacto', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	predeterminado: {
		type: Sequelize.BOOLEAN
	},
	id_cotizacion: {
		type: Sequelize.STRING(100)
	},
	nombre_artefacto: {
		type: Sequelize.STRING(20)
	},
	cantidad: {
		type: Sequelize.INTEGER
	},
	watts_artefacto: {
		type: Sequelize.INTEGER
	},
	horas_consumo: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'artefactos'
})

UsuarioConfiguracion.hasOne(Artefacto)

export default Artefacto