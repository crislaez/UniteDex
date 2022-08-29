import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BuildItem } from '../models';


@Injectable({
  providedIn: 'root'
})
export class BuildItemService {

  baseURL: string = `${this._coreConfig.baseEndpoint}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getBuildItems(): Observable<{buildItems: BuildItem[]}> {
    return this.http.get<{buildItems: BuildItem[]}>(`${this.baseURL}held_items.json`).pipe(
      map((response): any => {
        return { buildItems: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
