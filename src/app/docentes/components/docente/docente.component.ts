import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Docente } from '../../model/docente.model';
import { DocenteService } from '../../service/docente.service';
import { MatDialog } from '@angular/material/dialog';
import { DocenteModalComponent } from '../docente-modal/docente-modal.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit {
  //Inicializo una lista vacía de docentes, que sera rellenada en el OnInit
  docentes: Docente[] = [];

  //Llevamos a cabo la inyeccion de dependencias. En este caso:
  //docenteService: es una instancia del servicio docenteService que se utiliza para manejar la lógica relacionada
  //con los docentes. Con este podremos llamar a funciones como getDocentess(), getDocente(), etc.
  //dialog: es una instancia del servicio MatDialog, que forma parte de Angular Material. Este servicio se utiliza
  //para abrir dialogos (modales) en la aplicación. Permite mostrar ventanas emergentes que pueden contener
  //formularios, mensajes o cualquier otro contenido.
  constructor(
    private docenteService: DocenteService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getDocentes();
  }

  //Método que nos permite devolver a todos los docentes, llenando la lista vacía.
  getDocentes(): void {
    this.docenteService.getDocentes().subscribe((data) => {
      this.docentes = data; //transfiero la data devuelta por el getDocentes() a la lista de docentes.
    });
  }

  //Método utilizado para eliminar un docente. Tras finalizar, nos actualiza la lista de docentes.
  deleteDocente(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este alumno?')
    if (confirmation) {
      this.docenteService.deleteDocente(id).subscribe(() => {
        this.getDocentes(); //Cuando termina, me tiene que actualizar la lista de docentes, sino queda un docente cargado que fue eliminado.
      });
    }

  }

  //Método utilizado para actualizar un docente. Tras finalizar, nos actualiza la lista de docentes.
  updateDocente(docente: Docente): void {
    this.docenteService.updateDocente(docente.id, docente).subscribe(() => {
      this.getDocentes(); //Actualización de la lista de docentes.
    })
  }

  //FUNCIONES MODALES(): Permite abrir dialogos en la aplicación. Desarrollaremos dos:
  //openModalForAdd(): void   ->  modal que se abre al añadir un docente.
  //openModalForUpdate(): void -> modal que se abre al editar un docente.
  //El dialog REF es el dialogo que va abrirse al añadir o actualizar.

  //A nivel general, ambas funciones se utilizan para abrir un modal (cuadro de dialogo emergente) para agregar o actualizar un
  //docente. Los modales le permitirán al usuario ingresar o editar información de un docente y luego enviar los datos al servidor
  //mediante el servicio.
  //La función subscribe lo que hace es escuchar cuando se cierra el modal y si hay resultados (datos ingresados o modificados)
  //Ejecuta el código correspondiente.

  openModalForAdd(): void {
    //Esto abre un modal (DocenteModalComponent) con las dimensiones establecidas, y se pasa un objeto vacío en data, ya que es un 
    //formulario para agregar un docente nuevo. Aquí, data contiene dos propiedades iniciales: nombre y legajo que están 
    //vacías.
    const dialogRef = this.dialog.open(DocenteModalComponent, {
      width: '650px',
      height: '406px',
      data: {
        nombre: '',
        legajo: '', //Como añadimos un docente nuevo, deben estar vacías.
      },
    });


    //Tras cerrarse, los resultados traidos por el DialogRef sean pasados a la funcion addDocente como parametro.
    //Finalmente, el subscribe espera que el Observable le indique la correcta finalizacion y actualiza la lista 
    //de docentes.
    //Al cerrar el modal, el observable afterClosed() se ejecuta. Si el modal devuelve algún resultado (es decir, se añadió o modificó 
    //un alumno) entonces se realizan las acciones pertinentes.

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.docenteService.addDocente(result).subscribe(() => {
          this.getDocentes(); //Actualiza Lista de docentes.
        });
      }
    });
  }

  //Función general: abre un modal con los datos de un docente específico para que el usuario pueda 
  //editarlos. Al cerrar el modal, si hay cambios, los datos del docente se actualizan y luego la 
  //lista se refresca.  
  openModalForUpdate(docente: Docente): void {
    //En este caso, el modal se abre con los datos del docente a actualizar, que son pasados en el parámetro data:docente.
    //Los campos del formulario dentro del modal (DocenteModalComponent) estarán pre-poblados con los datos actuales del 
    //docente, lo que permite al usuario editar la información.
    const dialogRef = this.dialog.open(DocenteModalComponent, {
      width: '650px',
      height: '406px',
      data: docente,
    });
    //Similar a la función anterior, cuando el Modal se cierra, se ejecuta el código dentro de subscribe(). 
    //Si se han ingresado cambios, se ejecuta el código dentro de if(result).
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { //Si el resultado se ve modificado, actualizo al docente.
        this.updateDocente(result);
        //this.getDocentes(); no es necsario, ya que updateDocente lo llama.
      } else {
        this.getDocentes();
      }
    });
  }


}
