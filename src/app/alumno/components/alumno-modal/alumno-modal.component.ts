import { Component, Inject } from '@angular/core';
import { Alumno } from '../../model/alumno.model';
import { AlumnoService } from '../../service/alumno.service';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alumno-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumno-modal.component.html',
  styleUrl: './alumno-modal.component.css'
})

//Cuando llamamos a this.dialog.open() Angular Material:
//Crea un modal.
//Inserta en el el componente indicado.
//Inyecta automaticamente las dependendicas que el componente necesita como el MatDIalogRef y los data.
export class AlumnoModalComponent {
  constructor(
    //Angular inyecta una referencia al modal actual, lo que permite que el componente pueda controlar el modal.
    public dialogRef: MatDialogRef<AlumnoModalComponent>,
    //Angular inyecta los datos que fueron pasados al modal a través de la opción data en la llamada (open).
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) { }


  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    this.dialogRef.close(this.data);
  }

}

