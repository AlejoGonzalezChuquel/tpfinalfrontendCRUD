import { Alumno } from "../../alumno/model/alumno.model";
import { Docente } from "../../docentes/model/docente.model";
import { Tema } from "../../temas/model/tema.model";

//A diferencia de los otros models, debemos importar a Alumno, Docente y Tema, pues Curso almacena objetos de estos 3 tipos.
//Definimos entonces el campo curso:

export interface Curso {
    id: number;
    fechaInicio: string;
    fechaFin: string;
    precio: number;
    tema: Tema;
    docente: Docente;
    alumnos: Alumno[];
}