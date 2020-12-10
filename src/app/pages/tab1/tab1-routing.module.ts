import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  //aqui se agrega el tab hija que queremos direccionar
  {
    path: 'agregar',
    loadChildren: () => import('../agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
  path: 'agregar/:listaId',
  loadChildren:'../agregar/agregar.module#AgregarPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
