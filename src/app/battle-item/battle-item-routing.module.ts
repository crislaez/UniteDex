import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleItemPage } from './containers/battle-item.page';


const routes: Routes = [
  {
    path: ':battleItemName',
    component: BattleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BattleItemPageRoutingModule {}
