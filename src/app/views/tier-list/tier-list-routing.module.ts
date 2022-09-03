import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TierListPage } from './containers/tier-list.page';


const routes: Routes = [
  {
    path: '',
    component: TierListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TierListPageRoutingModule {}
