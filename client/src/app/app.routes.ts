import { Routes } from '@angular/router';
import { CriarProjetoComponent } from './routes/admin/criar-projeto/criar-projeto.component';
import { CriarHabilidadeComponent } from './routes/admin/criar-habilidade/criar-habilidade.component';
import { AppComponent as HomeComponent } from './routes/home/home.component';
import { ProjectComponentComponent } from './routes/project/project.component';
import { LoginComponent } from './routes/admin/login/login.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin/projects/create",
        component: CriarProjetoComponent
    },
    {
        path: "admin/skills/create",
        component: CriarHabilidadeComponent
    },
    {
        path: "proj/:id",
        component: ProjectComponentComponent
    },
    {
        path: "admin",
        component: LoginComponent
    }
];
