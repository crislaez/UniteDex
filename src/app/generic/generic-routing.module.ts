import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericPageComponent } from './containers/generic-page.component';


const routes: Routes = [
  {
    path: ':typeName',
    component: GenericPageComponent
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
