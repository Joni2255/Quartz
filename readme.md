
# App Panel


#### Registrar nuevo usuario

```http
  POST /register-user/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | `none` |

Cuando el usuario instala la aplicación, se envia una petición al backend (ruta 1), esta ruta te devuelve un token, el cual debes almacenar en el localstorage de flutter, es importante ya que este token almacenará toda la información del usuario, y se requerira para realizar las peticiones posteriores.



#### Seleccionar tamaño panel

```http
  POST /actualizar-panel/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Required**.  |
| `panelId` | `int`    | **Required** Tamaño de panel predeterminado. |

Es importante que el usuario antes de realizar una cotización seleccionr el tamaño de panel con el cual desea trabajar

#### Seleccionar tipo de batería

```http
  POST /actualizar-bateria/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Required**.  |
|`bateriaId`| `int`    | **Required** Tipo de bateria predeterminada. |

Es importante que el usuario antes de realiar una cotización seleccione el tipo de bateria con el cual hará la cotización, necesita seleccionar tanto bateria, como panel.

#### Crear artefacto

```http
  POST /crear-artefacto/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Required**.  |
|`token_cotizacion`| `string`    | **Required** Token generado momentaneo. |
|`nombre`| `string`    | **Required**. |
|`watts_artefacto`| `int`    | **Required**. |
|`horas_consumo`| `int`    | **Required**. |

Todos los artefactos llevan un "token_cotizacion", debe ser el mismo por cada artefacto de la misma cotización.
Por cada cotización se debe generar un token, al terminar la cotizacion, se debe **ELIMINAR**.
Te enseño a generar un token a continuación.

#### Crear Token

```http
  POST /crear-token/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | `none` |

#### Obtener paneles

```http
  GET /obtener-panel/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | `none` |

#### Obtener inversores

```http
  GET /obtener-inversores/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | `none` |

#### Obtener baterias

```http
  GET /obtener-baterias/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | `none` |

#### Actualizar precio panel

```http
  POST /actualizar-precio-panel/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**.  |
|`id_panel`| `int`    | **Required** Panel el cual se actualizará el precio. |
|`nuevo_precio`| `int`    | **Required**. |

#### Actualizar precio inversor

```http
  POST /actualizar-precio-inversor/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**.  |
|`id_inversor`| `int`    | **Required** Inversor el cual se actualizará el precio. |
|`nuevo_precio`| `int`    | **Required**. |

#### Actualizar precio bateria

```http
  POST /actualizar-precio-bateria/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**.  |
|`id_bateria`| `int`    | **Required** Inversor el cual se actualizará el precio. |
|`nuevo_precio`| `int`    | **Required**. |

### Realizar cotización

```http
  POST /crear-cotizacion/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**.  |
|`id_cotizacion`| `int`    | **Required** Mismo con el cual se ingresaron los artefactos. |

### Revisar historial

```http
  POST /historial/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**.  |