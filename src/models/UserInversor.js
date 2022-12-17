import Sequelize from 'sequelize'
import db from '../config/db.js'

import Inversor from './Inversor.js'
import UsuarioConfiguracion from './UsuarioConfiguracion.js'

const UserInversor = db.define('user_inversor', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	precio_inversor_user: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'user_inversor'
})

Inversor.belongsToMany(UsuarioConfiguracion, { through: UserInversor })
UsuarioConfiguracion.belongsToMany(Inversor, { through: UserInversor })

export default UserInversor