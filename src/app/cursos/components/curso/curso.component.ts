import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../model/curso.model';
import { CursoService } from '../../service/curso.service';
import { CursoModalComponent } from '../curso-modal/curso-modal.component';
import { Alumno } from '../../../alumno/model/alumno.model';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-curso',
  standalone: true,
  //CommonModule para los ng y FormsModule para el ngModel.
  imports: [CommonModule, FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {
  //Inicializamos dos listas vacias de Curso y Alumnos, que seran "rellenadas" por medio del OnInit.
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];


  //Inicializacion de las variables que contendrán los values de los inputs.
  fechaFin: string = '';
  docenteId: number = 0;

  //Lista de alumnos por curso y cursos Filtrados
  cursosFiltrados: Curso[] = [];
  alumnosPorCurso: Alumno[] = [];


  constructor(
    //Llevamos a cabo la inyeccion de dependencias. En este caso:
    //alumnoservice: es una instancia del servicio AlumnoService que se utiliza para manejar la lógica relacionada
    //con los alumnos. Con este podremos llamar a funciones como getAlumnos(), getAlumno(), etc.
    //cursoservice: es una instancia del servicio CursoService que se utiliza para manejar la lógica relacionada
    //con los cursos. Con este podremos llamar a funciones como getCursos(), getCurso(), etc.
    //dialog: es una instancia del servicio MatDialog, que forma parte de Angular Material. Este servicio se utiliza
    //para abrir dialogos (modales) en la aplicación. Permite mostrar ventanas emergentes que pueden contener
    //formularios, mensajes o cualquier otro contenido.
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private dialog: MatDialog
  ) { }

  //ngOnInit es un método que se llama despues de la inicialización de todas las propiedades vinculadas al componente.
  //En este caso, hace la llamada a el método getAlumnos()
  ngOnInit(): void {
    this.getCursos();
    this.getAlumnos();
  }

  //getAlumnos() : Método del componente que no devuelve ningun valor. Su proposito es obtener la lista de alumnos.
  //Es decir, cuando getAlumnos es llamada, hace una solicitud al servicio alumnoService, que envía una solicitud a
  //la API. En este caso alumnoService.getAlumnos() retorna un observable que representa la respuesta asíncrona de 
  //la API. Al llamar a subscribe, el componente se suscribe a ese observable. Cuando la API responde con los datos,
  //el Observable emite esos datos y la función de callback toma esos datos como argumento data y se los asigna a la
  //lista de alumnos.
  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    })
  }

  getCursos(): void {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
    })
  }


  //El método deleteCurso elimina un curso identificado por su id. Este método:
  //1. Llama al servicio cursoservice.deleteCurso(id) para eliminar el curso, enviando una solicitud HTTP al backend.
  //2. Utiliza subscribe() para ejecutar la función dentro de él una vez que la operación de eliminación es exitosa.
  //3. Dentro del subscribe(), se llama al método getCursos() para actualizar la lista de cursos, asegurándose de que se 
  //   refleje el cambio (la eliminación del curso) en la vista.
  // El flujo asegura que después de eliminar un curso, la lista se actualice automáticamente. Utilizamos el subscirbe para 
  //escuchar al observable. Cuando el servidor responde que el curso fue eliminado con éxito, el código de subscribe se ejecuta. 
  //En este caso, el código actualiza la lista de cursos. Sin el subscribe, Angular no sabría cuando la operación de eliminación 
  //ha terminado y no se actualiza la lista de cursos hasta hacer una recarga manual.
  deleteCurso(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este curso?')
    if (confirmation) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.getCursos();
      });
    }

  }




  //Metodo para actualizar un curso, este recibe el curso a actualizar, y realiza la solicitud HTTP correspondiente.
  //Una vez que la función de actualización fue exitosa, el subscribe nos permite actualizar la lista de cursos por medio del
  // this.getCursos();
  updateCurso(curso: Curso): void {
    this.cursoService.updateCurso(curso.id, curso).subscribe(() => {
      this.getCursos();
    });
  }

  openModalForAdd(): void {
    //Esto abre un modal (CursoModalComponent) con las dimensiones establecidas, y se pasa un objeto vacío en data, ya que es un 
    //formulario para agregar un curso nuevo. Aquí, data contiene dos propiedades iniciales: fechaInicio, fechaFin, precio,etc. que están 
    //vacías.
    const dialogRef = this.dialog.open(CursoModalComponent, {
      width: '650px',
      height: '450px',
      data: {
        fechaInicio: '',
        fechaFin: '',
        precio: '',
        tema: null,
        docente: null,
        alumnos: null,
      },
    });

    //Tras cerrarse, los resultados traidos por el DialogRef sean pasados a la funcion addCursoo como parametro.
    //Finalmente, el subscribe espera que el Observable le indique la correcta finalizacion y actualiza la lista 
    //de cursos.
    //Al cerrar el modal, el observable afterClosed() se ejecuta. Si el modal devuelve algún resultado (es decir, se añadió o modificó 
    //un alumno) entonces se realizan las acciones pertinentes.

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService.addCurso(result).subscribe(() => {
          this.getCursos();
        });
      }
    });
  }

  //Función general: abre un modal con los datos de un Curso específico para que el usuario pueda 
  //editarlos. Al cerrar el modal, si hay cambios, los datos del curso se actualizan y luego la 
  //lista se refresca. 
  openModalForUpdate(curso: Curso): void {
    //En este caso, el modal se abre con los datos del curso a actualizar, que son pasados en el parámetro data:curso.
    //Los campos del formulario dentro del modal (CursoModalComponent) estarán pre-poblados con los datos actuales del 
    //curso, lo que permite al usuario editar la información.
    const dialogRef = this.dialog.open(CursoModalComponent, {
      width: '650px',
      height: '450px',
      data: curso,
    });

    //Similar a la función anterior, cuando el Modal se cierra, se ejecuta el código dentro de subscribe(). 
    //Si se han ingresado cambios, se ejecuta el código dentro de if(result).

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { //Si el resultado se ve modificado, actualizo al curso.
        this.updateCurso(result);
        //this.getCursos(); no es necsario, ya que updateCurso lo llama.
      } else {
        this.getCursos();
      }

      //Aqui deberia haber otro GET.
    });

  }

  findCursosByFechaFin(): void {
    if (this.fechaFin) { //Si se ingresa una fecha de fin, llamar al metodo findCursosByFechaFin del servicio cursoService con
      //fechaFin como parametro. Por medio del subscribe, cuando recibe la respuesta asigna los cursos obtenidos a
      //this.cursosFiltrados.
      this.cursoService.findCursosByFechaFin(this.fechaFin).subscribe((cursos) => {
        this.cursosFiltrados = cursos;
      })
    } else {
      //Si la fecha esta vacía, dejo la lista vacía.
      this.cursosFiltrados = [];
    }
  }

  findAlumnosByDocente(): void {
    if (this.docenteId) { //Si se ingreso un ID, llama al metodo findAlumnosByCursosVigentes del servicio
      //cursoService, pasando this.docenteId como argumento.
      //Al recibir los datos con subscribe, los almacena.
      this.cursoService.findAlumnosByCursosVigentes(this.docenteId).subscribe((alumnos) => {
        this.alumnosPorCurso = alumnos;
      })
      if (this.alumnosPorCurso.length === 0) {
        this.getCursos(); // Volvemos a cargar todos los cursos en caso de que no se detecten
      }
    } else {
      //Si el ID esta vacío, se establece como un array vacio.
      this.alumnosPorCurso = [];
    }
  }



}
