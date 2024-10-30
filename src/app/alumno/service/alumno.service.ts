import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../model/alumno.model';

//Centralizamos las interacciones con la API por medio de las llamadas HTTP.
//Nos permite implementar lógica de negocio, pues se pueden agregar funciones que calculan o procesan datos
//antes de entregarlos a componentes.

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  //Definimos una constante donde ponemos la URL del backend.
  private API_URL = 'http://localhost:8080/api/alumnos'

  // Aqui se esta declarando una propiedad privada llamada http del tipo HttpClient.
  //HttpClient es un servicio que Angular proporciona para hacer solicitudes HTTP a la API.
  constructor(private http: HttpClient) { }

  //Función destinada a obtener la lista de alumnos. Este devolverá un Observable que emitira una lista de Alumnos.
  //por medio de this.http.get se utiliza el servicio HttpClient para hacer una solicitud HTTP del tipo GET.
  //El observable nos permite suscribirnos a una fuente de datos y reaccionar cada vez que se emite un nuevo valor.
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.API_URL);
  }

  //Funcion destinada a obtener un unico alumno.
  //La función acepta un parámetro id de tipo number. 
  //El valor de retorno es un Observable que emitirá un objeto de tipo Alumno.
  //Las comillas fuertes nos permiten crear cadenas de texto que posean expresiones dinámicas.
  //Por medio de ${} podemos incluir variables.
  getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.API_URL}/${id}`);
  }

  //Esta función tiene como objetivo enviar una solicitud HTTP del tipo POST a la API 
  //para agregar un nuevo alumno. Los datos del alumno se envían en el cuerpo de la solicitud 
  //y devuelve un Observable que emitirá un objeto de tipo Alumno cuando la operación se complete correctamente.
  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.API_URL}/add`, alumno);
  }

  //Esta función tiene como objetivo enviar una solicitud HTTP del tipo DELETE a la API.
  //Para ello recibe el ID del alumno a ser eliminado. Devuelve un observable del tipo void, lo que siginfica que
  //no esperamos que la respuesta contega ningún dato especifico, solo la confirmación de que la operación fue 
  //exitosa. Es decir, podemos suscribirnos al observable para asegurarnos que la operación se haya completado.
  //El tipo <void> indica que noe speramos un cuerpo de respuesta de la API, lo que es típico de solicitudes de
  //eliminación donde solo necesitamos confirmación del exito.
  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/alumnos/delete/${id}`);
  }

  //Siguiendo la logica implementada en el service de nuestro BACKEND, la función que nos permite actualizar un 
  //Alumno requiere no solo el ID del alumno a actualizar, sino un nuevo objeto Alumno con los valores ahora si
  //actualizados.
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`http://localhost:8080/api/alumnos/update/${id}`, alumno);
  }

}
