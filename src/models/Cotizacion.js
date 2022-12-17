import Sequelize from 'sequelize'
import db from '../config/db.js'
import UsuarioConfiguracion from './UsuarioConfiguracion.js'

const Cotizacion = db.define('cotizacion', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha: {
		type: Sequelize.DATE
	},
	precio_total: {
		type: Sequelize.INTEGER 
	}
}, {
	timestamps: false,
	tableName: 'cotizaciones'
})

UsuarioConfiguracion.hasOne(Cotizacion)

export default Cotizacion