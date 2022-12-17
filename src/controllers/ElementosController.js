import Panel from "../models/Panel.js"
import Inversor from "../models/Inversor.js"
import Bateria from "../models/Bateria.js"
import UserPanel from "../models/UserPanel.js"
import UsuarioConfiguracion from "../models/UsuarioConfiguracion.js"
import UserInversor from "../models/UserInversor.js"
import UserBateria from "../models/UserBateria.js"

export const obtener_panel_usuario = async (req, res) => {

}

export const obtener_panel = async (req, res) => {
	const { id, token } = req.params
	const panel = await Panel.findOne({ where: { id: id } })
	const user = await UsuarioConfiguracion.findOne({ where: { token: token }, raw: true })
	const panelUser = await UserPanel.findOne({ where: { panelId: panel.id, usuarioconfiguracionId: user.id } })

	if (panel.length !== 0) {
		res.status(200).send({
			id: panel.id,
			precio: panelUser !== null ? panelUser.precio_panel_user : panel.precio_panel
		})
	}
}

export const obtener_inversor = async (req, res) => {
	const { id, token } = req.params
	const inversor = await Inversor.findOne({ where: { id: id } })
	const user = await UsuarioConfiguracion.findOne({ where: { token: token } })
	const inversorUser = await UserInversor.findOne({ where: { inversorId: inversor.id, usuarioconfiguracionId: user.id } })

	if (inversor.length !== 0) {
		res.status(200).send({
			id: inversor.id,
			precio: inversorUser !== null ? inversorUser.precio_inversor_user : inversor.precio_inversor
		})
	}
}

export const obtener_bateria = async (req, res) => {
	const { id, token } = req.params

	const bateria = await Bateria.findOne({ where: { id: id } })
	const user = await UsuarioConfiguracion.findOne({ where: { token: token } })
	const bateriaUser = await UserBateria.findOne({ where: { bateriumId: bateria.id, usuarioconfiguracionId: user.id } })

	if (bateria.length !== 0) {
		res.status(200).send({
			id: bateria.id,
			precio: bateriaUser !== null ? bateriaUser.precio_bateria_user : bateria.precio_bateria
		})
	}
}
