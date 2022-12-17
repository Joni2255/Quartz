import DetalleCotizacion from '../models/DetalleCotizacion.js'
import Artefacto from "../models/Artefacto.js";
import Bateria from "../models/Bateria.js";
import Cotizacion from "../models/Cotizacion.js";
import Inversor from "../models/Inversor.js";
import Panel from "../models/Panel.js";
import UsuarioConfiguracion from "../models/UsuarioConfiguracion.js";
import UserPanel from '../models/UserPanel.js';
import UserInversor from '../models/UserInversor.js';
import UserBateria from '../models/UserBateria.js';
import ArtefactoCotizacion from '../models/ArtefactoCotizacion.js';
import moment from 'moment/moment.js';
import { Sequelize } from 'sequelize';

export const calcular_cotizacion = async (req, res) => {

	console.log("Token Usuario:", req.body.token)
	console.log("Token Cotizacion:", req.body.id_cotizacion)
	const user = await UsuarioConfiguracion.findOne({ where: { token: req.body.token } })
	
	const artefactos = await Artefacto.findAll({
		where: { 
			usuarioconfiguracionId: user.id,
			id_cotizacion: req.body.id_cotizacion
		},
		raw: true
	})

	let wh = 0
	let watts_totales = 0 // SIRVE PARA OBTENER EL INVERSOR 
	for (let i in artefactos) {
		let artefacto = artefactos[i]
		wh += artefacto.watts_artefacto * artefacto.horas_consumo
		watts_totales += artefacto.watts_artefacto
	}
	const hsp = user.hora_sol_pico
	// wh_arterfactos /  watts_panel / HSP
	const panel = await Panel.findOne({ where: { id: user.panelId }, raw: true })
	const bateriaA = await Bateria.findOne({ where: { id: user.bateriumId }, raw: true })

	const watts_panel = panel.watts_panel
	const cantidad_paneles = wh / watts_panel.split('-')[0] / hsp
	const inversor = await getInversor(watts_totales)
	const bateria = await getBateria(watts_totales, user.bateriumId)


	const panel_precio_conf = await UserPanel.findOne({ where: { usuarioconfiguracionId: user.id, panelId: panel.id }, raw: true })
	const precio_panel = panel_precio_conf !== null ? panel_precio_conf.precio_panel_user : panel.precio_panel
	

	const inversor_precio_conf = await UserInversor.findOne({ where: { usuarioconfiguracionId: user.id, inversorId: inversor.id } })
	const precio_inversor = inversor_precio_conf !== null ? inversor_precio_conf.precio_inversor_user : inversor.precio_inversor

	const bateria_precio_conf = await UserBateria.findOne({ where: { usuarioconfiguracionId: user.id, bateriumId: bateriaA.id } })
	const precio_bateria = bateria_precio_conf !== null ? bateria_precio_conf.precio_bateria_user : bateriaA.precio_bateria

	const total_paneles = precio_panel * Math.ceil(cantidad_paneles)
	const total_inversores = precio_inversor
	const total_bateria = precio_bateria * Math.ceil(bateria)


	const cotizacion = await Cotizacion.create({ fecha: Date.now(), precio_total: total_paneles + total_inversores + total_bateria, usuarioconfiguracionId: user.id })
	

	for (let i in artefactos) {
		await ArtefactoCotizacion.create({
			artefactoId: artefactos[i].id,
			cotizacionId: cotizacion.id
		})
	}

	await DetalleCotizacion.create({
		panelId: panel.id,
		inversorId: inversor.id,
		bateriumId: bateriaA.id,
		cotizacionId: cotizacion.id
	})
	res.status(200).send({
		panel: {
			id: panel.id,
			tipo: panel.tamano_panel,
			precio: panel_precio_conf !== null ? panel_precio_conf.precio_panel_user : panel.precio_panel,
			cantidad: Math.ceil(cantidad_paneles)
		},
		inversor: {
			id: inversor.id,
			tipo: inversor.watts_inversor,
			precio: precio_inversor,
			cantidad: 1
		},
		bateria: {
			id: bateriaA.id,
			tipo: bateriaA.amperios_hora,
			precio: bateriaA.precio_bateria,
			cantidad: Math.ceil(bateria)
		},
		total: total_paneles + total_inversores + total_bateria
	})
}

export const obtener_historial = async (req, res) => {
	const user = await UsuarioConfiguracion.findOne({ where: { token: req.params.token } })
	const cotizaciones = await Cotizacion.findAll({ where: { usuarioconfiguracionId: user.id }, raw: true, order: [
		['fecha', 'DESC']
	] })
	let historial = {}
	for (let i in cotizaciones) {
		const detalles = await DetalleCotizacion.findOne({ where: { cotizacionId: cotizaciones[i].id }, raw: true })
		historial[i] = cotizaciones[i]
		historial[i].detalles = detalles

		historial[i].date = moment(historial[i].fecha).format('D/MM/YYYY, HH:mm')

	}
	if (Object.keys(historial).length > 0) {
		res.status(200).send({ cotizaciones: historial })
	} else {
		res.status(404).send({message: 'No existe historial.'})
	}

}

export const eliminar_cotizacion = async (req, res) => {
	const { id_cotizacion } = req.params
	const cotizacion = await Cotizacion.findOne({ where: { id: id_cotizacion }, raw: true })
	if (cotizacion.length !== 0) {
		await Cotizacion.destroy({ where: { id: id_cotizacion } })
		return res.status(200).send('Se ha eliminado una cotizacion')
	}
	return res.status(404).send('No se pudo eliminar.')
	
	
}

export const obtener_cotizacion = async (req, res) => {
	const { id_cotizacion, token } = req.params
	const user = await UsuarioConfiguracion.findOne({ where: { token: token } })

	const cotizacion = await Cotizacion.findOne({ where: { id: id_cotizacion }, raw: true })

	const artefactos = await ArtefactoCotizacion.findAll({ where: { cotizacionId: cotizacion.id } })

	let lista = []
	for (let i in artefactos) {
		let art = await Artefacto.findOne({ where: { id: artefactos[i].artefactoId }, raw: true })
		lista.push(art)
	}


	const detalles = await DetalleCotizacion.findOne({ where: { cotizacionId: cotizacion.id } })
	const panel = await Panel.findOne({ where: { id: detalles.panelId } })
	const panel_precio_conf = await UserPanel.findOne({ where: { usuarioconfiguracionId: user.id, panelId: panel.id }, raw: true })

	const hsp = user.hora_sol_pico
	let wh = 0	
	let watts_totales = 0 // SIRVE PARA OBTENER EL INVERSOR 
	for (let i in artefactos) {
		// let artefacto = artefactos[i]
		let artefacto = await Artefacto.findOne({ where: { id: artefactos[i].artefactoId }, raw: true})
		wh += artefacto.watts_artefacto * artefacto.horas_consumo
		
		watts_totales += artefacto.watts_artefacto
	}
	const watts_panel = panel.watts_panel

	const cantidad_paneles = wh / watts_panel.split('-')[0] / hsp


	const bateriaA = await Bateria.findOne({ where: { id: user.bateriumId }, raw: true })
	const bateria = await getBateria(watts_totales, user.bateriumId)
	const bateria_precio_conf = await UserBateria.findOne({ where: { usuarioconfiguracionId: user.id, bateriumId: bateriaA.id } })
	
	const inversor = await getInversor(watts_totales)
	const inversor_precio_conf = await UserInversor.findOne({ where: { usuarioconfiguracionId: user.id, inversorId: inversor.id } })
	

	res.status(200).send({
		cotizacion: cotizacion,
		artefactos: lista,
		elementos: {
			panel: {
				id: panel.id,
				tipo: panel.tamano_panel,
				precio: panel_precio_conf !== null ? panel_precio_conf.precio_panel_user : panel.precio_panel,
				cantidad: Math.ceil(cantidad_paneles)
			},
			bateria: {
				id: bateriaA.id,
				tipo: bateriaA.amperios_hora,
				precio: bateria_precio_conf !== null ? bateria_precio_conf.precio_bateria_user : bateriaA.precio_bateria,
				cantidad: Math.ceil(bateria)
			},
			inversor: {
				id: inversor.id,
				tipo: inversor.watts_inversor,
				precio: inversor_precio_conf !== null ? inversor_precio_conf.precio_inversor_user : inversor.precio_inversor,
				cantidad: 1
			}
		}
	})
}

async function getInversor(watts_totales) {
	const inversor1 = await Inversor.findOne({ where: { id: 1 }, raw: true })
	const inversor2 = await Inversor.findOne({ where: { id: 2 }, raw: true })
	const inversor3 = await Inversor.findOne({ where: { id: 3 }, raw: true })
	const inversor4 = await Inversor.findOne({ where: { id: 4 }, raw: true })
	const inversor5 = await Inversor.findOne({ where: { id: 5 }, raw: true })
	
	if (watts_totales < inversor1.watts_inversor) {
		return inversor1
	} else if (watts_totales < inversor2.watts_inversor) {
		return inversor2
	} else if (watts_totales < inversor3.watts_inversor) {
		return inversor3
	} else if (watts_totales < inversor4.watts_inversor) {
		return inversor4
	} else if (watts_totales < inversor5.watts_inversor) {
		return inversor5
	} else {
		return inversor5
	}
	// return inversor1
}

async function getBateria(watts_totales, id_bateria) {
	const calculo_watts = watts_totales * 0.6
	const bateria = await Bateria.findOne({ where: { id: id_bateria }, raw: true })
	
	const calculo_bateria = (bateria.voltaje_bateria * bateria.amperios_hora) * 0.5

	return calculo_watts / calculo_bateria

}



/*
El sistema al haber realizado el cálculo de la energía total (Wh) se tiene que usar un porcentaje de energía usada para la noche,
 estimaremos a 60%, esto se multiplica y nos da el resultado de 1954 WH. Ejemplo: tenemos los 3.256WH 
 (número de ejemplo de energía total) x 0.6 = 1950 WH. 

 

Las baterías no deben superar el 50% de uso, por ende, en cada batería se tiene que multiplicar sus volteos(V) 
por sus amperios hora (AH), luego de este resultado se multiplica por 0,5. ejemplo: 12V x 100AH = 1200 x 0,5 = 600WH 

Ya teniendo la energía total (WH) y los 600Wh de la batería, estos se dividen para dar la cantidad de baterías que necesitaremos.  

Ejemplo: 1954WH / 600 WH = 3.25= 4, estos resultados también se redondean hacia arriba. 
*/