import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/alumno.model';
import { AlumnoService } from '../../service/alumno.service';
import { CommonModule } from '@angular/common';
import { AlumnoModalComponent } from '../alumno-modal/alumno-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] = [] //Definimos una lista vacía de alumnos, que será llenada en el OnInit

  constructor(
    //Llevamos a cabo la inyeccion de dependencias. En este caso:
    //alumnoservice: es una instancia del servicio AlumnoService que se utiliza para manejar la lógica relacionada
    //con los alumnos. Con este podremos llamar a funciones como getAlumnos(), getAlumno(), etc.
    //dialog: es una instancia del servicio MatDialog, que forma parte de Angular Material. Este servicio se utiliza
    //para abrir dialogos (modales) en la aplicación. Permite mostrar ventanas emergentes que pueden contener
    //formularios, mensajes o cualquier otro contenido.
    private alumnoService: AlumnoService,
    private dialog: MatDialog
  ) { }

  //ngOnInit es un método que se llama despues de la inicialización de todas las propiedades vinculadas al componente.
  //En este caso, hace la llamada a el método getAlumnos()
  ngOnInit(): void {
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
    });
  }

  //El método deleteAlumno elimina un alumno identificado por su id. Este método:
  //1. Llama al servicio alumnoservice.deleteAlumno(id) para eliminar el alumno, enviando una solicitud HTTP al backend.
  //2. Utiliza subscribe() para ejecutar la función dentro de él una vez que la operación de eliminación es exitosa.
  //3. Dentro del subscribe(), se llama al método getAlumnos() para actualizar la lista de alumnos, asegurándose de que se 
  //   refleje el cambio (la eliminación del alumno) en la vista.
  // El flujo asegura que después de eliminar un alumno, la lista se actualice automáticamente. Utilizamos el subscirbe para 
  //escuchar al observable. Cuando el servidor responde que el alumno fue eliminado con éxito, el código de subscribe se ejecuta. 
  //En este caso, el código actualiza la lista de alumnos. Sin el subscribe, Angular no sabría cuando la operación de eliminación 
  //ha terminado y no se actualiza la lista de alumnos hasta hacer una recarga manual.
  deleteAlumno(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este alumno?')
    if (confirmation) {
      this.alumnoService.deleteAlumno(id).subscribe(() => {
        this.getAlumnos();
        //console.log('Se elimina el alumno `${id}`');
      });
    }
  }


  //Metodo para actualizar un alumno, este recibe el alumno a actualizar, y realiza la solicitud HTTP correspondiente.
  //Una vez que la función de actualización fue exitosa, el subscribe nos permite actualizar la lista de alumnos por medio del
  // this.getAlumnos();
  updateAlumno(alumno: Alumno): void {
    this.alumnoService.updateAlumno(alumno.id, alumno).subscribe(() => {
      this.getAlumnos(); // Refrescar la lista de alumnos después de actualizar
    });
  }

  //FUNCIONES MODALES(): Permite abrir dialogos en la aplicación. Desarrollaremos dos:
  //openModalForAdd(): void   ->  modal que se abre al añadir un alumno.
  //openModalForUpdate(): void -> modal que se abre al editar un alumno.
  //El dialog REF es el dialogo que va abrirse al añadir o actualizar.

  //A nivel general, ambas funciones se utilizan para abrir un modal (cuadro de dialogo emergente) para agregar o actualizar un
  //alumno. Los modales le permitirán al usuario ingresar o editar información de un alumno y luego enviar los datos al servidor
  //mediante el servicio.
  //La función subscribe lo que hace es escuchar cuando se cierra el modal y si hay resultados (datos ingresados o modificados)
  //Ejecuta el código correspondiente.





  openModalForAdd(): void {
    //Esto abre un modal (AlumnModalComponent) con las dimensiones establecidas, y se pasa un objeto vacío en data, ya que es un 
    //formulario para agregar un alumno nuevo. Aquí, data contiene dos propiedades iniciales: nombre y fecha de nacimiento que están 
    //vacías.
    const dialogRef = this.dialog.open(AlumnoModalComponent, {
      width: '650px',
      height: '406px',
      data: {
        nombre: '',
        fechaNacimiento: '', //deben estar vacios.
      },
    });

    //Tras cerrarse, los resultados traidos por el DialogRef sean pasados a la funcion addAlumno como parametro.
    //Finalmente, el subscribe espera que el Observable le indique la correcta finalizacion y actualiza la lista 
    //de alumnos.
    //Al cerrar el modal, el observable afterClosed() se ejecuta. Si el modal devuelve algún resultado (es decir, se añadió o modificó 
    //un alumno) entonces se realizan las acciones pertinentes.
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.updateAlumno(result);
        console.log(result);
        this.alumnoService.addAlumno(result).subscribe(() => {
          this.getAlumnos();
        });
      }
    });
  }

  //Función general: abre un modal con los datos de un alumno específico para que el usuario pueda 
  //editarlos. Al cerrar el modal, si hay cambios, los datos del alumno se actualizan y luego la 
  //lista se refresca. 
  openModalForUpdate(alumno: Alumno): void {
    //En este caso, el modal se abre con los datos del alumno a actualizar, que son pasados en el parámetro data:alumno.
    //Los campos del formulario dentro del modal (AlumnoModalComponent) estarán pre-poblados con los datos actuales del 
    //alumno, lo que permite al usuario editar la información.
    const dialogRef = this.dialog.open(AlumnoModalComponent, {
      width: '650px',
      height: '406px',
      data: alumno, //Al abri el dialogref, debemos ver los datos del alumno que va a ser editado.
    });
    //Similar a la función anterior, cuando el Modal se cierra, se ejecuta el código dentro de subscribe(). 
    //Si se han ingresado cambios, se ejecuta el código dentro de if(result).
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { //Si el resultado se ve modificado, actualizo al alumno.
        this.updateAlumno(result);
        //this.getAlumnos(); no es necsario, ya que updateAlumno lo llama.
        console.log(result);
      } else {
        this.getAlumnos();
      }
    });
  }

}
