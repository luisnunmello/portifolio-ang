import { Routes } from '@angular/router';
import { AppComponent as HomeComponent } from './routes/home/home.component';
import { ProjectComponentComponent } from './routes/project/project.component';
import { CreateProjectComponent } from './routes/admin/projects/create/create-project.component';
import { CreateSkillComponent } from './routes/admin/skills/create/create-skill.component';
import { ProjectsComponent } from './routes/admin/projects/projects.component';
import { SkillsComponent } from './routes/admin/skills/skills.component';
import { AdminComponent } from './routes/admin/admin.component';
import { adminGuard } from './guard/admin-guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin/projects",
        component: ProjectsComponent,
        canActivate: [adminGuard]
    },
    {
        path: "admin/projects/create",
        component: CreateProjectComponent,
        canActivate: [adminGuard]
    },
    {
        path: "admin/projects/edit",
        component: CreateProjectComponent,
        canActivate: [adminGuard]

    },
    {
        path: "admin/skills",
        component: SkillsComponent,
        canActivate: [adminGuard]
    },
    {
        path: "admin/skills/create",
        component: CreateSkillComponent,
        canActivate: [adminGuard]
    },
    {
        path: "admin/skills/edit",
        component: CreateSkillComponent,
        canActivate: [adminGuard]
    },
    {
        path: "proj/:id",
        component: ProjectComponentComponent
    },
    {
        path: "admin",
        component: AdminComponent,
    }
];
