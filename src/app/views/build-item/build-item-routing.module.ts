import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildItemPage } from './containers/build-item.page';


const routes: Routes = [
  {
    path: ':buildItemName',
    component: BuildItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildItemPageRoutingModule {}
