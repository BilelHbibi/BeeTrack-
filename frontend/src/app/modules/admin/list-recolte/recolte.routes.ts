import { Routes } from '@angular/router';
import { ListRuchersComponent} from 'app/modules/admin/list-ruchers/list-ruchers.component';
import {ListRecolteComponent} from "./list-recolte.component";

export default [
    {
        path     : '',
        component: ListRecolteComponent,
    },
] as Routes;
