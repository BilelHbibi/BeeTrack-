import { Routes } from '@angular/router';
import { ListRuchersComponent} from 'app/modules/admin/list-ruchers/list-ruchers.component';
import {ListRuchComponent} from "./list-ruch.component";

export default [
    {
        path     : '',
        component: ListRuchComponent,
    },
] as Routes;
