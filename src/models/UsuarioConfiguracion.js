import Sequelize from 'sequelize'
import db from '../config/db.js'
import Bateria from './Bateria.js'
import Panel from './Panel.js'

const UsuarioConfiguracion = db.define('usuarioconfiguracion', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	token: {
		type: Sequelize.STRING(100),
		unique: true
	},
	hora_sol_pico: {
		type: Sequelize.INTEGER,
		default: null
	}
}, {
	timestamps: false,
	tableName: 'usuario_configuracion'
})

Panel.hasOne(UsuarioConfiguracion)
Bateria.hasOne(UsuarioConfiguracion)

export default UsuarioConfiguracion