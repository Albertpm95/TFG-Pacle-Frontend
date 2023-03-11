import { Rol } from "./rol"

export interface Usuario {
  apellidos: string
  estado: boolean
  id_usuario: number
  nombre: string
  rol: Rol
  username: string
}
export interface UsuarioLogin {
  username: string;
  password: string;
}