import { Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/components/alumno/alumno.component';
import { DocenteComponent } from './docentes/components/docente/docente.component';
import { TemaComponent } from './temas/components/tema/tema.component';
import { CursoComponent } from './cursos/components/curso/curso.component';


export const routes: Routes = [
    { path: 'alumnos', component: AlumnoComponent },
    { path: 'docentes', component: DocenteComponent },
    { path: 'temas', component: TemaComponent },
    { path: 'cursos', component: CursoComponent },
    { path: '', redirectTo: '/cursos', pathMatch: 'full' },
    { path: '**', redirectTo: '/cursos' },
];
