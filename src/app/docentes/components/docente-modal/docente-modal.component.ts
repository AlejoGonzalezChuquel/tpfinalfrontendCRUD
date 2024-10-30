import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Docente } from '../../model/docente.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-docente-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './docente-modal.component.html',
  styleUrl: './docente-modal.component.css'
})

//Cuando llamamos a this.dialog.open() Angular Material:
//Crea un modal.
//Inserta en el el componente indicado.
//Inyecta automaticamente las dependendicas que el componente necesita como el MatDIalogRef y los data.
export class DocenteModalComponent {
  constructor(
    //Angular inyecta una referencia al modal actual, lo que permite que el componente pueda controlar el modal.
    public dialogRef: MatDialogRef<DocenteModalComponent>,
    //Angular inyecta los datos que fueron pasados al modal a través de la opción data en la llamada (open).
    @Inject(MAT_DIALOG_DATA) public data: Docente
  ) { }

  //Metodo en caso de que se presione el boton "Cancelar" o equivalente
  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data); //Envia la data ingresada.
  }
}
