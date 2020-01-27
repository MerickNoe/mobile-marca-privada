import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'pareada-list', loadChildren: './pages/pareada-list/pareada-list.module#PareadaListPageModule', canActivate: [AuthGuard] },
  { path: 'jarmix-list', loadChildren: './pages/jarmix-list/jarmix-list.module#JarmixListPageModule', canActivate: [AuthGuard] },
  { path: 'hedonica-list', loadChildren: './pages/hedonica-list/hedonica-list.module#HedonicaListPageModule', canActivate: [AuthGuard] },
  { path: 'dod-list', loadChildren: './pages/dod-list/dod-list.module#DodListPageModule', canActivate: [AuthGuard] },
  { path: 'duotrio-list', loadChildren: './pages/duotrio-list/duotrio-list.module#DuotrioListPageModule', canActivate: [AuthGuard] },
  { path: 'children-list', loadChildren: './pages/children-list/children-list.module#ChildrenListPageModule', canActivate: [AuthGuard] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
