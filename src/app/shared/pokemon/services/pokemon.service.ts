import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from '../models';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL: string = `${this._coreConfig.baseEndpoint}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getPokemons(): Observable<{pokemons: Pokemon[]}> {
    return this.http.get<{pokemons: Pokemon[]}>(`${this.baseURL}pokemon.json`).pipe(
      map((response): any => {
        return { pokemons: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

