import { Router } from 'express'
import { actualizar_artefacto, crear_artefacto, crear_token, eliminar_artefacto, obtener_artefacto, obtener_artefactos_cotizacion, restar_artefacto, sumar_artefacto } from './controllers/ArtefactosController.js'
import { calcular_cotizacion, eliminar_cotizacion, obtener_cotizacion, obtener_historial } from './controllers/CotizacionController.js'
import { obtener_bateria, obtener_inversor, obtener_panel } from './controllers/ElementosController.js'
import { actualizar_hsp, cambiar_precio_bateria, cambiar_precio_inversor, cambiar_precio_panel, obtenerBaterias, obtenerInversores, obtenerPaneles, register_user, seleccionar_bateria, seleccionar_tamano_panel, user_configs } from './controllers/UsuarioController.js'

const router = Router()

// Usuario configuración
router.get('/register-user', register_user)
router.get('/user-configs/:token', user_configs)

// Actualizar panel predeterminado
router.post('/actualizar-panel', seleccionar_tamano_panel)

// Actualizar bateria predeterminada
router.post('/actualizar-bateria', seleccionar_bateria)

// Actualizar hora sol pico
router.post('/actualizar-hsp', actualizar_hsp)

// Actualizar precio panel
router.post('/actualizar-precio-panel', cambiar_precio_panel)

// Actualizar precio bateria
router.post('/actualizar-precio-bateria', cambiar_precio_bateria)

// Actualizar precio inversor
router.post('/actualizar-precio-inversor', cambiar_precio_inversor)

// obtener panel
router.get('/panel/:id/:token', obtener_panel)
router.get('/inversor/:id/:token', obtener_inversor)
router.get('/bateria/:id/:token', obtener_bateria)


// 
router.post('/eliminar-artefacto/:id_artefacto', eliminar_artefacto)
router.post('/sumar-artefacto/:id_artefacto', sumar_artefacto)
router.post('/restar-artefacto/:id_artefacto', restar_artefacto)

router.get('/obtener-artefactos/:id_cotizacion', obtener_artefactos_cotizacion)

// Obtener paneles
router.get('/obtener-paneles', obtenerPaneles)

// Obtener inversores
router.get('/obtener-inversores', obtenerInversores)

// Obtener baterias
router.get('/obtener-baterias', obtenerBaterias)

// Artefactos
router.post('/crear-artefacto', crear_artefacto)

// cotizacion
router.get('/obtener-cotizacion/:id_cotizacion/:token', obtener_cotizacion)

// Calcular Cotizacion
router.post('/crear-cotizacion/', calcular_cotizacion)

router.get('/historial/:token', obtener_historial)

router.post('/eliminar-cotizacion/:id_cotizacion', eliminar_cotizacion);

router.post('/actualizar-artefacto/:id_artefacto', actualizar_artefacto)
router.get('/obtener-artefacto/:id_artefacto', obtener_artefacto)
// Generar token para cotizacion
router.get('/crear-token', crear_token)


router.get('/obtener-artefacto/:id_artefacto', obtener_artefacto)
router.post('/actualizar-artefacto/:id_artefacto', actualizar_artefacto)

export default router

