import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatlleItemPage } from './containers/batlle-item.page';


const routes: Routes = [
  {
    path: ':battleItemName',
    component: BatlleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatlleItemPageRoutingModule {}
