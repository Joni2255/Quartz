import Sequelize from 'sequelize'
import db from '../config/db.js'
import Artefacto from './Artefacto.js'
import Cotizacion from './Cotizacion.js'
const ArtefactoCotizacion = db.define('artefactocotizacion', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
}, {
	timestamps: false,
	tableName: 'artefacto_cotizaciones'
})

Artefacto.hasOne(ArtefactoCotizacion)
Cotizacion.hasOne(ArtefactoCotizacion)

export default ArtefactoCotizacion