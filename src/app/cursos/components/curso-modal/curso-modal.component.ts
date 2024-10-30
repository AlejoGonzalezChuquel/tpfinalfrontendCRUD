import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Docente } from '../../../docentes/model/docente.model';
import { Alumno } from '../../../alumno/model/alumno.model';
import { Tema } from '../../../temas/model/tema.model';
import { Curso } from '../../model/curso.model';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { TemaService } from '../../../temas/service/tema.service';
import { DocenteService } from '../../../docentes/service/docente.service';


@Component({
  selector: 'app-curso-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './curso-modal.component.html',
  styleUrl: './curso-modal.component.css'
})
export class CursoModalComponent implements OnInit {
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  temas: Tema[] = [];


  //Cuando llamamos a this.dialog.open() Angular Material:
  //Crea un modal.
  //Inserta en el el componente indicado.
  //Inyecta automaticamente las dependendicas que el componente necesita como el MatDIalogRef y los data.
  constructor(
    //Angular inyecta una referencia al modal actual, lo que permite que el componente pueda controlar el modal.
    public dialogRef: MatDialogRef<CursoModalComponent>,
    //Angular inyecta los datos que fueron pasados al modal a través de la opción data en la llamada (open).
    @Inject(MAT_DIALOG_DATA) public data: Curso,

    //Inyectamos instancias de los servicios de Docente, Alumno y Tema para poder utilizar sus funciones.
    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {
    this.getDocentes();
    this.getAlumnos();
    this.getTemas();
  }

  //Obtenemos los docentes disponibles.
  getDocentes(): void {
    this.docenteService.getDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  //Obtenemos los alumnos disponibles.
  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  //Obtenemos los temas disponibles.
  getTemas(): void {
    this.temaService.getTemas().subscribe((data) => {
      this.temas = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }

}
