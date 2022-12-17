import Sequelize from 'sequelize'
import db from '../config/db.js'

import Bateria from './Bateria.js'
import UsuarioConfiguracion from './UsuarioConfiguracion.js'

const UserBateria = db.define('user_bateria', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	precio_bateria_user: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'user_bateria'
})

Bateria.belongsToMany(UsuarioConfiguracion, { through: UserBateria })
UsuarioConfiguracion.belongsToMany(Bateria, { through: UserBateria })

export default UserBateria