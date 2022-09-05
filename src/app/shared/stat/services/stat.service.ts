import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Stat } from '../models';


@Injectable({
  providedIn: 'root'
})
export class StatService {

  baseURL: string = `${this._coreConfig.baseEndpoint}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getStats(): Observable<{stats: Stat[]}> {
    return this.http.get<{stats: Stat[]}>(`${this.baseURL}stats.json`).pipe(
      map((response): any => {
        return { stats: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
