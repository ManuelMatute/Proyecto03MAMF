// src/lib/demoBooks.ts
import { createBook, EstadoLibro } from "./books";

const demoBooks = [
  {
    genero: "Arte",
    titulo: "Historia del arte moderno",
    estado: "Bueno" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:00–10:20",
    aprobado: true,
  },
  {
    genero: "Arte",
    titulo: "Fundamentos de diseño gráfico",
    estado: "Nuevo" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:20–10:40",
    aprobado: true,
  },
  {
    genero: "Ingeniería",
    titulo: "Cálculo de una variable – Stewart",
    estado: "Bueno" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:40–11:00",
    aprobado: true,
  },
  {
    genero: "Ingeniería",
    titulo: "Circuitos eléctricos – Nilsson & Riedel",
    estado: "Aceptable" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "11:00–11:20",
    aprobado: true,
  },
  {
    genero: "Literatura",
    titulo: "Cien años de soledad",
    estado: "Bueno" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:00–10:20",
    aprobado: true,
  },
  {
    genero: "Literatura",
    titulo: "El amor en los tiempos del cólera",
    estado: "Nuevo" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:20–10:40",
    aprobado: true,
  },
  {
    genero: "Ciencias",
    titulo: "Física universitaria – Sears & Zemansky",
    estado: "Bueno" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "10:40–11:00",
    aprobado: true,
  },
  {
    genero: "Idiomas",
    titulo: "Gramática de uso del español B1–B2",
    estado: "Bueno" as EstadoLibro,
    estudianteNombre: "Stock inicial ESPOL",
    estudianteCorreo: "libros@espol.edu.ec",
    estudianteCodigo: "0000000000",
    bloqueHorario: "11:00–11:20",
    aprobado: true,
  },
];

export async function seedDemoBooks() {
  for (const book of demoBooks) {
    await createBook(book);
  }
}
