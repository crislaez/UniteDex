import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT, Environment } from '../models/tokens';

export enum EndpointType {
  api = '/api/',
};

export interface CoreConfig {
  langs: string[];
};


@Injectable({
  providedIn: 'root'
})
export class CoreConfigService {

  protected _config: CoreConfig;


  constructor(@Inject(ENVIRONMENT) private _env: Environment) { }


  importConfig(coreConfigRaw: any): void {
    this._config = {
      langs: coreConfigRaw.Languages
    } as CoreConfig;
  }


  get baseEndpoint(): string {
    return `${this._env.baseEndpoint}`;
  }

  get perPage(): string {
    return `${this._env.perPage}`;
  }

  get getEmblemUrl(): string {
    return this._env.emblemUrl;
  }

  imageUrl(type:string, name:string, isEvo:boolean = false): string {
    return `${this._env.firebaseUrlImages}${type}%2F${name?.replace(/ /g,'-')}${(!!isEvo ? '.jpg' : '.png')}?alt=media&token=${this._env.firebaseToken}`;
  }

}
