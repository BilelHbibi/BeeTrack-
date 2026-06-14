import { Routes } from '@angular/router';
import { ListRuchersComponent} from 'app/modules/admin/list-ruchers/list-ruchers.component';
import {ListTacheComponent} from "./list-tache.component";

export default [
    {
        path     : '',
        component: ListTacheComponent,
    },
] as Routes;
