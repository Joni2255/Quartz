import Bateria from "../models/Bateria.js"
import Inversor from "../models/Inversor.js"
import Panel from "../models/Panel.js"

export default () => {
	Bateria.create({
		id: 1,
		voltaje_bateria: 12,
		amperios_hora: 55,
		precio_bateria: 103500
	})

	Bateria.create({
		id: 2,
		voltaje_bateria: 12,
		amperios_hora: 100,
		precio_bateria: 158300
	})

	Bateria.create({
		id: 3,
		voltaje_bateria: 12,
		amperios_hora: 150,
		precio_bateria: 257235
	})

	Bateria.create({
		id: 4,
		voltaje_bateria: 12,
		amperios_hora: 200,
		precio_bateria: 353126
	})

	Bateria.create({
		id: 5,
		voltaje_bateria: 12,
		amperios_hora: 250,
		precio_bateria: 390660
	})

	Inversor.create({
		id: 1,
		watts_inversor: 500,
		voltaje_inversor: 12,
		precio_inversor: 29954
	})

	Inversor.create({
		id: 2,
		watts_inversor: 1000,
		voltaje_inversor: 12,
		precio_inversor: 36740
	})

	Inversor.create({
		id: 3,
		watts_inversor: 1500,
		voltaje_inversor: 12,
		precio_inversor: 45230
	})

	Inversor.create({
		id: 4,
		watts_inversor: 2000,
		voltaje_inversor: 12,
		precio_inversor: 50156
	})

	Inversor.create({
		id: 5,
		watts_inversor: 2500,
		voltaje_inversor: 12,
		precio_inversor: 209995
	})


	Panel.create({
		id: 1,
		voltaje_panel: 12,
		watts_panel: '285-400',
		tamano_panel: '1-1.7',
		precio_panel: 120000
	})

	Panel.create({
		id: 2,
		voltaje_panel: 12,
		watts_panel: '350-490',
		tamano_panel: '2-1',
		precio_panel: 182263,
	})

	Panel.create({
		id: 3,
		voltaje_panel: 12,
		watts_panel: '350-490',
		tamano_panel: '2.3-1.1',
		precio_panel: 204483,
	})

	Panel.create({
		id: 4,
		voltaje_panel: 12,
		watts_panel: '560-680',
		tamano_panel: '2.4-1.3',
		precio_panel: 252900,
	})
}