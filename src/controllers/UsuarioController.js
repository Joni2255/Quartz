import UserPanel from '../models/UserPanel.js'
import UserBateria from '../models/UserBateria.js'
import Panel from '../models/Panel.js'
import UserInversor from '../models/UserInversor.js'
import UsuarioConfiguracion from '../models/UsuarioConfiguracion.js'
import Inversor from '../models/Inversor.js'
import Bateria from '../models/Bateria.js'

export const register_user = async (req, res) => {
	const token = generate_token()
	const user = await UsuarioConfiguracion.findAll({where: { token: token }})
	if (user.length === 0) {
		const userConfiguration = await UsuarioConfiguracion.create({ token: token, panelId: 1, bateriumId: 1, hora_sol_pico: 5 })
		res.status(200).send({'token': userConfiguration.token})
	}
}

export const user_configs = async (req, res) => {
	const { token } = req.params;
	const user = await UsuarioConfiguracion.findOne({ where: { token: token } })
	if (user.length !== 0) {
		res.status(200).send( user )
	}
}


export const seleccionar_tamano_panel = async (req, res) => {
	const { token, panelId } = req.body
	const user = await UsuarioConfiguracion.findOne({where: { token: token } })
	if (user.length !== 0) {
		const userConfiguration = await UsuarioConfiguracion.update({ panelId: panelId }, { where: { token: token } })
		res.status(200).send('Panel actualizado correctamente.')
	}
}

export const seleccionar_bateria = async (req, res) => {
	const { token, bateriaId } = req.body
	const user = await UsuarioConfiguracion.findOne({ where: { token: token } })

	if (user.length !== 0) {
		const userConfiguration = await UsuarioConfiguracion.update({ bateriumId: bateriaId }, { where: { token: token }})
		res.status(200).send('Bateria actualizada correctamente.')
	}
}

export const actualizar_hsp = async (req, res) => {
	const { token, nuevo_hsp } = req.body

	const userConfiguration = await UsuarioConfiguracion.update({ hora_sol_pico: nuevo_hsp }, { where: { token: token } })
		res.status(200).send('hsp actualizado.')
}

export const cambiar_precio_inversor = async (req, res) => {
	const { token, id_inversor, nuevo_precio } = req.body
	const user = await UsuarioConfiguracion.findOne({ where: { token: token }, raw: true })
	
	if (user.length !== 0) {
		const userInversor = await UserInversor.findOne({ where: { usuarioconfiguracionId: user.id, inversorId: id_inversor } })
		if (userInversor === null) {
			const inversorUser = await UserInversor.create({ usuarioconfiguracionId: user.id, inversorId: id_inversor, precio_inversor_user: nuevo_precio })
			
			res.status(200).send('Precio cambiado correctamente.')
		} else {
			const inversorUser = await UserInversor.update({ where: { usuarioconfiguracionId: user.id, inversorId: id_inversor } }, { precio_inversor_user: nuevo_precio })
			
			res.status(200).send('Precio cambiado correctamente.')
		}
	}
}

export const cambiar_precio_bateria = async (req, res) => {
	const { token, id_bateria, nuevo_precio } = req.body
	const user = await UsuarioConfiguracion.findOne({ where: { token: token }, raw: true })

	if (user.length !== 0) {
		const userBateria = await UserBateria.findOne({ where: { usuarioconfiguracionId: user.id, bateriumId: id_bateria } })
		if (userBateria === null) {
			const bateriauser = await UserPanel.create({ usuarioconfiguracionId: user.id, bateriumId: id_bateria, precio_bateria_user: nuevo_precio })
			
			res.status(200).send('Precio cambiado correctamente.')
		} else {
			const bateriauser = await UserPanel.update({ precio_bateria_user: nuevo_precio }, { where: { usuarioconfiguracionId: user.id, bateriumId: id_bateria }})
			
			res.status(200).send('Precio cambiado correctamente.')
		}
	}
}

export const cambiar_precio_panel = async (req, res) => {
	const { token, id_panel, nuevo_precio } = req.body
	const user = await UsuarioConfiguracion.findOne({ where: { token: token }, raw: true })

	if (user.length !== 0) {
		const userPanel = await UserPanel.findOne({ where: { usuarioconfiguracionId: user.id, panelId: id_panel } })
		if (userPanel === null) {
			const paneluser = await UserPanel.create({ usuarioconfiguracionId: user.id, panelId: id_panel, precio_panel_user: nuevo_precio })
			
			res.status(200).send('Precio cambiado correctamente.')
		} else {
			const paneluser = await UserPanel.update({ precio_panel_user: nuevo_precio }, { where: { usuarioconfiguracionId: user.id, panelId: id_panel }})
			
			res.status(200).send('Precio cambiado correctamente.')
		}
	}

}

export const obtenerPaneles = async (req, res) => {
	const paneles = await Panel.findAll()
	res.status(200).send(paneles)
}

export const obtenerInversores = async (req, res) => {
	const inversores = await Inversor.findAll()
	res.status(200).send(inversores)
}

export const obtenerBaterias = async (req, res) => {
	const baterias = await Bateria.findAll()
	res.status(200).send(baterias)
}

const generate_token = () => {
	return generate_key() + generate_key() + generate_key() + generate_key() + generate_key()
}

const generate_key = () => {
	return Math.random().toString(36).substr(2)
}