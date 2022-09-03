import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { PokemonModule } from '@uniteDex/shared/pokemon/pokemon.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { AbilitiesComponent } from './components/abilities.component';
import { BuildsComponent } from './components/builds.component';
import { InfoComponent } from './components/info.component';
import { PokemonPage } from './containers/pokemon.page';
import { PokemonPageRoutingModule } from './pokemon-routing.module';

const SHARED_MODULE = [
  PokemonModule,
  SharedModule
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    PokemonPageRoutingModule
  ],
  declarations: [
    PokemonPage,
    InfoComponent,
    BuildsComponent,
    AbilitiesComponent
  ]
})
export class PokemonPageModule {}
