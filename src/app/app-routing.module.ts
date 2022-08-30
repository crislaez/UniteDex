import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./generic/generic.module').then( m => m.GenericModule)
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pokemon/pokemon.module').then( m => m.PokemonPageModule)
  },
  {
    path: 'battleItem',
    loadChildren: () => import('./battle-item/battle-item.module').then( m => m.BattleItemPageModule)
  },
  {
    path: 'buildItem',
    loadChildren: () => import('./build-item/build-item.module').then( m => m.BuildItemPageModule)
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
