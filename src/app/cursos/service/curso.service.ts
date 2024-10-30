import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../model/curso.model';
import { Alumno } from '../../alumno/model/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private API_URL = "http://localhost:8080/api/cursos"
  constructor(private http: HttpClient) { }

  //Método retorna todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }

  //Método que te permite obtener un curso en especifico por ID.
  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.API_URL}/${id}`)
  }

  //Método que te permite añadir un curso.
  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.API_URL}/add`, curso);
  }

  //Método que te permite eliminar un curso

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  //Método que te permite actualizar un curso
  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.API_URL}/update/${id}`, curso);
  }

  //Añadimos los ENDPOINTS correspondientes a encontrar cursos por fecha de fin y cursos vigentes.
  findCursosByFechaFin(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API_URL}/fecha-fin/${fechaFin}`);
  }

  findAlumnosByCursosVigentes(docenteId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.API_URL}/vigentes/docente/${docenteId}/alumnos`)
  }
}

