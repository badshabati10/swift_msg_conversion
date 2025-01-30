import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./_helpers";
import {PrivateComponent} from "./private/private.component";

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'private',
    loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule),
    canActivate: [AuthGuard]
  },{
    path: '',component: PrivateComponent, canActivate: [AuthGuard]

  },
  {path: '**', redirectTo: '/'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
