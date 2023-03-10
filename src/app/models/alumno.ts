export class Alumno {
  id_alumno?: number
  dni: string
  nombre: string
  apellidos: string

  constructor(dni: string, nombre: string, apellidos: string, id_alumno?: number) {
    if (id_alumno) this.id_alumno = id_alumno
    this.dni = dni
    this.nombre = nombre
    this.apellidos = apellidos
  }
}