export interface Usuario {
  apellidos: string
  estado: boolean
  id_usuario: number
  nombre: string
  rol: string
  username: string
}
export interface UsuarioLogin {
  username: string;
  password: string;
}