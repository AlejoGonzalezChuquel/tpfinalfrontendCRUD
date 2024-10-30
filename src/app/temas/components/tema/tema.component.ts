import { Component, OnInit } from '@angular/core';
import { Tema } from '../../model/tema.model';
import { TemaService } from '../../service/tema.service';
import { MatDialog } from '@angular/material/dialog';
import { TemaModalComponent } from '../tema-modal/tema-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})

export class TemaComponent {
  //Inicializo una lista vacía de temas, que sera rellenada en el OnInit
  temas: Tema[] = [];

  //Llevamos a cabo la inyeccion de dependencias. En este caso:
  //temaeService: es una instancia del servicio temaService que se utiliza para manejar la lógica relacionada
  //con los temas. Con este podremos llamar a funciones como getTemas(), getTema(), etc.
  //dialog: es una instancia del servicio MatDialog, que forma parte de Angular Material. Este servicio se utiliza
  //para abrir dialogos (modales) en la aplicación. Permite mostrar ventanas emergentes que pueden contener
  //formularios, mensajes o cualquier otro contenido.
  constructor(
    private temaService: TemaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTemas()
  }

  //Método que nos permite devolver a todos los temas, llenando la lista vacía.
  getTemas(): void {
    this.temaService.getTemas().subscribe((data) => {
      this.temas = data //transfiero la data devuelta por el getTemas() a la lista de temas.
    })
  }

  //Método utilizado para eliminar un Tema. Tras finalizar, nos actualiza la lista de temas.
  deleteTema(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este alumno?')
    if (confirmation) {
      this.temaService.deleteTema(id).subscribe(() => {
        this.getTemas();//Actualización de la lista de temas.
      });
    }

  }

  //Método utilizado para actualizar un tema. Tras finalizar, nos actualiza la lista de temas.
  updateTema(tema: Tema): void {
    this.temaService.updateTema(tema.id, tema).subscribe(() => {
      this.getTemas(); //Actualización de la lista de temas tras actualización.
    })
  }

  //FUNCIONES MODALES(): Permite abrir dialogos en la aplicación. Desarrollaremos dos:
  //openModalForAdd(): void   ->  modal que se abre al añadir un tema.
  //openModalForUpdate(): void -> modal que se abre al editar un tema.
  //El dialog REF es el dialogo que va abrirse al añadir o actualizar.

  //A nivel general, ambas funciones se utilizan para abrir un modal (cuadro de dialogo emergente) para agregar o actualizar un
  //tema. Los modales le permitirán al usuario ingresar o editar información de un tema y luego enviar los datos al servidor
  //mediante el servicio.
  //La función subscribe lo que hace es escuchar cuando se cierra el modal y si hay resultados (datos ingresados o modificados)
  //Ejecuta el código correspondiente.

  openModalForAdd(): void {
    //Esto abre un modal (TemaModalComponent) con las dimensiones establecidas, y se pasa un objeto vacío en data, ya que es un 
    //formulario para agregar un tema nuevo. Aquí, data contiene dos propiedades iniciales: nombre y descripcion que están 
    //vacías.
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '650px',
      height: '406px',
      data: {
        nombre: '',
        descripcion: '', //Como añadimos un tema nuevo, deben estar vacías.
      },
    });

    //Tras cerrarse, los resultados traidos por el DialogRef sean pasados a la funcion addTema como parametro.
    //Finalmente, el subscribe espera que el Observable le indique la correcta finalizacion y actualiza la lista 
    //de docentes.
    //Al cerrar el modal, el observable afterClosed() se ejecuta. Si el modal devuelve algún resultado (es decir, se añadió o modificó 
    //un alumno) entonces se realizan las acciones pertinentes.
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.temaService.addTema(result).subscribe(() => {
          this.getTemas();
        });
      }
    });
  }

  //Función general: abre un modal con los datos de un tema específico para que el usuario pueda 
  //editarlos. Al cerrar el modal, si hay cambios, los datos del tema se actualizan y luego la 
  //lista se refresca.
  openModalForUpdate(tema: Tema): void {
    //En este caso, el modal se abre con los datos del tema a actualizar, que son pasados en el parámetro data:tema
    //Los campos del formulario dentro del modal (TemaModalComponent) estarán pre-poblados con los datos actuales del 
    //docente, lo que permite al usuario editar la información.
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '650px',
      height: '406px',
      data: tema,
    });

    //Similar a la función anterior, cuando el Modal se cierra, se ejecuta el código dentro de subscribe(). 
    //Si se han ingresado cambios, se ejecuta el código dentro de if(result).
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {//Si el resultado se ve modificado, actualizo al tema.
        this.updateTema(result); // Actualizar el tema después de cerrar el modal
        console.log(result);
        //this.getTemas(); no es necsario, ya que updateTema lo llama.
      } else {
        this.getTemas();
      }
    });
  }
}
