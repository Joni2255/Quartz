import UsuarioConfiguracion from '../models/UsuarioConfiguracion.js'
import Artefacto from '../models/Artefacto.js'

export const crear_artefacto = async (req, res) => {
	const { nombre, watts_artefacto, horas_consumo, token_cotizacion } = req.body	
	const user = await UsuarioConfiguracion.findOne({ where: { token: req.body.token } })
	await Artefacto.create({
		predeterminado: false,
		nombre_artefacto: nombre,
		watts_artefacto: watts_artefacto,
		cantidad: 1,
		id_cotizacion: token_cotizacion,
		horas_consumo: horas_consumo,
		usuarioconfiguracionId: user.id
	})

	res.send({'message': '', 'id_cotizacion': token_cotizacion})
}

export const actualizar_artefacto = async (req, res) => {
    const { nombre, watts, horas } = req.body
    const { id_artefacto } = req.params
    const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
	
    // if (artefacto.length !== 0) {
        const artefactoEditado = await Artefacto.update({nombre_artefacto: nombre, watts_artefacto: watts, horas_consumo: horas}, { where: { id: id_artefacto } })
        res.status(200).send({artefacto: artefactoEditado})
    // } else {
    //     res.status(404).send({ message: 'Artefacto no encontrado.'})
    // }

}

export const obtener_artefacto = async (req, res) => {
    const { id_artefacto } = req.params
    const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
    if (artefacto.length !== 0) {
        res.status(200).send({ artefacto: artefacto })
    } else {
        res.status(404).send({ 'message': 'Artefacto no encontrado.' })
    }

}

export const sumar_artefacto = async (req, res) => {
	const { id_artefacto } = req.params
	const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
	if (artefacto === null) {
		return res.status(404).send('Ha ocurrido un error.')
	}
	let cantidad = artefacto.cantidad + 1
	await Artefacto.update({ cantidad: cantidad }, { where: { id: id_artefacto } })
	res.status(200).send('Se ha sumado 1')
}

export const restar_artefacto = async (req, res) => {
	const { id_artefacto } = req.params
	const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
	if (artefacto.cantidad <= 1 || artefacto === null) {
		return res.status(404).send('Ha ocurrido un error.')
	}
	let cantidad = artefacto.cantidad - 1
	await Artefacto.update({ cantidad: cantidad }, { where: { id: id_artefacto } })
	res.status(200).send('Se ha restado 1')
}

export const eliminar_artefacto = async (req, res) => {
	const { id_artefacto } = req.params
	const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
	if (artefacto.length !== 0) {
		await Artefacto.destroy({ where: { id: id_artefacto } })
		return res.status(200).send('Se ha eliminado un artefacto')
	}
	return res.status(404).send('No se pudo eliminar.')
	
}

// export const actualizar_artefacto = async (req, res) => {
// 	const { nombre, watts, horas } = req.body
// 	const { id_artefacto } = req.params
// 	const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
// 	if (artefacto.length !== 0) {
// 		const artefactoEditado = await Artefacto.update({nombre_artefacto: nombre, watts_artefacto: watts, horas_consumo: horas}, { where: { id: id_artefacto } })
// 		res.status(200).send({artefacto: artefactoEditado})
// 	} else {
// 		res.status(404).send({ message: 'Artefacto no encontrado.'})
// 	}

// }

// export const obtener_artefacto = async (req, res) => {
// 	const { id_artefacto } = req.params
// 	const artefacto = await Artefacto.findOne({ where: { id: id_artefacto }, raw: true })
// 	if (artefacto.length !== 0) {
// 		res.status(200).send({ artefacto: artefacto })
// 	} else {
// 		res.status(404).send({ 'message': 'Artefacto no encontrado.' })
// 	}

// }

export const obtener_artefactos_cotizacion = async (req, res) => {
	const { id_cotizacion } = req.params
	const artefactos = await Artefacto.findAll({ where: { id_cotizacion: id_cotizacion } })
	if (artefactos.length !== 0) {
		res.status(200).send({'artefactos': artefactos})
	} else {
		res.status(404).send({'message': 'no se ha encontrado ningun artefacto'})
	}
}

export const crear_token = async (req, res) => {
	res.status(200).send({token: generate_token()})
}

const generate_token = () => {
	return generate_key() + generate_key() + generate_key() + generate_key() + generate_key()
}

const generate_key = () => {
	return Math.random().toString(36).substr(2)
}