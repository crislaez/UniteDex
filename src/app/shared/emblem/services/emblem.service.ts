import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Emblem, EmblemColor } from '../models';


@Injectable({
  providedIn: 'root'
})
export class EmblemService {

  baseURL: string = `${this._coreConfig.baseEndpoint}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getEmblems(): Observable<{emblems: Emblem[]}> {
    return this.http.get<{emblems: Emblem[]}>(`${this.baseURL}emblems.json`).pipe(
      map((response): any => {
        return { emblems: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getEmblemsColors(): Observable<{emblemColors: EmblemColor[]}> {
    return this.http.get<{emblemColors: EmblemColor[]}>(`${this.baseURL}emblem_sets.json`).pipe(
      map((response): any => {
        return { emblemColors: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
