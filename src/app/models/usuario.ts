import { Rol } from './rol'

export class Usuario {
  apellidos: string
  estado: boolean
  idUsuario?: number
  nombre: string
  rol: Rol
  username: string

  constructor(nombre: string, apellidos: string, estado: boolean, rol: Rol, username: string) {
    this.nombre = nombre
    this.apellidos = apellidos
    this.estado = estado
    this.rol = rol
    this.username = username
  }
}
export interface UsuarioLogin {
  username: string
  password: string
}
