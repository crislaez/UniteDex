import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericPage } from './containers/generic-page';


const routes: Routes = [
  {
    path: ':typeName',
    component: GenericPage
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericPageRoutingModule {}
