//Creamos el interfaz que nos define el tipo de alumno.
//Para ello representamos los datos del alumno, que en este caso son ID, Nombre y fecha de nacimiento.
//Un modelo en Angular es generalmente una clase TypeScript que define las propiedades y métodos relacionados 
//con un conjunto de datos. Esta clase se utiliza para estructurar la información de una manera que sea fácil de 
//manejar y procesar dentro de la aplicación.

export interface Alumno {
    id: number;
    nombre: string;
    fechaNacimiento: Date;
}




