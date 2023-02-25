import { Roles } from "@constants"

export interface Usuario {
  apellidos: string
  estado: boolean
  id_usuario: number
  nombre: string
  rol: Roles
  username: string
}
export interface UsuarioLogin {
  username: string;
  password: string;
}