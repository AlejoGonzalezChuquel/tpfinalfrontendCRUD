//Creamos el interfaz que nos define el tipo de tema.
//Para ello representamos los datos del tema, que en este caso son ID, Nombre y descripcion.
//Un modelo en Angular es generalmente una clase TypeScript que define las propiedades y métodos relacionados 
//con un conjunto de datos. Esta clase se utiliza para estructurar la información de una manera que sea fácil de 
//manejar y procesar dentro de la aplicación.

export interface Tema {
    id: number;
    nombre: string;
    descripcion: string;
}