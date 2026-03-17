import { Routes } from '@angular/router';
import { AppComponent as HomeComponent } from './routes/home/home.component';
import { ProjectComponentComponent } from './routes/project/project.component';
import { LoginComponent } from './routes/admin/login/login.component';
import { CriarProjetoComponent } from './routes/admin/projects/criar-projeto/criar-projeto.component';
import { CriarHabilidadeComponent } from './routes/admin/skills/criar-habilidade/criar-habilidade.component';
import { ProjectsComponent } from './routes/admin/projects/projects.component';
import { SkillsComponent } from './routes/admin/skills/skills.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin/projects",
        component: ProjectsComponent
    },
    {
        path: "admin/projects/create",
        component: CriarProjetoComponent
    },
    {
        path: "admin/projects/edit",
        component: CriarProjetoComponent
    },
    {
        path: "admin/skills",
        component: SkillsComponent
    },
    {
        path: "admin/skills/create",
        component: CriarHabilidadeComponent
    },
    {
        path: "admin/skills/edit",
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
