import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./views/generic/generic.module').then( m => m.GenericModule)
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./views/pokemon/pokemon.module').then( m => m.PokemonPageModule)
  },
  {
    path: 'battleItem',
    loadChildren: () => import('./views/battle-item/battle-item.module').then( m => m.BattleItemPageModule)
  },
  {
    path: 'buildItem',
    loadChildren: () => import('./views/build-item/build-item.module').then( m => m.BuildItemPageModule)
  },
  {
    path: 'tierList',
    loadChildren: () => import('./views/tier-list/tier-list.module').then( m => m.TierListPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
