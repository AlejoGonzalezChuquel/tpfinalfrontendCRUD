import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../model/tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private API_URL = 'http://localhost:8080/api/temas';

  constructor(private http: HttpClient) { }

  //Método para obtener todos los temas
  getTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.API_URL);
  }

  //Método para obtener un tema especifico segun su ID.
  getTema(id: number): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.API_URL}/${id}`);
  }

  //Método para añadir un tema nuevo a la lista
  addTema(tema: Tema): Observable<Tema[]> {
    return this.http.post<Tema[]>(`${this.API_URL}/add`, tema);
  }

  //Método para eliminar un tema especeifico.
  deleteTema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  //Método para Editar un tema de la lista de temas ya vigente
  updateTema(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.API_URL}/update/${id}`, tema);
  }
}

