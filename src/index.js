import express from 'express'
import bodyParser from 'body-parser'
import routes from './index.routes.js'
import db from './config/db.js'
import CrearElementos from './config/CrearElementos.js'

const app = express()

db.sync({
	force: false
}).then(() => {
	console.log('Conectando a la base de datos...')
	//CrearElementos()
})

// Enable body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Importar modelos
import Artefacto from './models/Artefacto.js'
import Bateria from './models/Bateria.js'
import Cotizacion from './models/Cotizacion.js'
import Inversor from './models/Inversor.js'
import UsuarioConfiguracion from './models/UsuarioConfiguracion.js'
import DetalleCotizacion from './models/DetalleCotizacion.js'
import UserInversor from './models/UserInversor.js'
import UserBateria from './models/UserBateria.js'
import UserPanel from './models/UserPanel.js'
import ArtefactoCotizacion from './models/ArtefactoCotizacion.js'

app.use('/', routes)

app.listen(3000, () => {
	console.log('App listening at http://localhost:3000/')
})