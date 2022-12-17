import Sequelize from 'sequelize'
import db from '../config/db.js'

import Panel from './Panel.js'
import Bateria from './Bateria.js'
import Inversor from './Inversor.js'
import Cotizacion from './Cotizacion.js'

const DetalleCotizacion = db.define('detalle_cotizacion', {
	id_precio_conf_panel: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
}, {
	timestamps: false,
	tableName: 'detalles_cotizaciones'
})

Panel.hasOne(DetalleCotizacion)
Inversor.hasOne(DetalleCotizacion)
Bateria.hasOne(DetalleCotizacion)
Cotizacion.hasOne(DetalleCotizacion)


export default DetalleCotizacion