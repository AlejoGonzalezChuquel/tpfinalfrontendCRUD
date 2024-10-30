import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../model/docente.model'

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private API_URL = 'http://localhost:8080/api/docentes';

  constructor(private http: HttpClient) { }

  //Método retorna todos los docentes
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.API_URL);
  }

  //Método que te permite obtener un docente en especifico por ID.
  getDocente(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.API_URL}/${id}`);
  }

  //Método que te permite añadir un docente.
  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.API_URL}/add`, docente);
  }

  //Método que te permite eliminar un docente
  deleteDocente(id: number): Observable<void> { //No importa que no retorne nada, necesitamos el Observable para los subscribers.
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  //Método para updatear un docente
  updateDocente(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.API_URL}/update/${id}`, docente);
  }
}

