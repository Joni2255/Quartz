import Sequelize from 'sequelize'
import db from '../config/db.js'

import Panel from './Panel.js'
import UsuarioConfiguracion from './UsuarioConfiguracion.js'

const UserPanel = db.define('user_panel', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	precio_panel_user: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false,
	tableName: 'user_panel'
})

Panel.belongsToMany(UsuarioConfiguracion, { through: UserPanel })
UsuarioConfiguracion.belongsToMany(Panel, { through: UserPanel })

export default UserPanel