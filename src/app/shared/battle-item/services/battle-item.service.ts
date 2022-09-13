import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BattleItem } from '../models';


@Injectable({
  providedIn: 'root'
})
export class BattleItemService {

  baseURL: string = `${this._coreConfig.baseEndpoint}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getBattleItems(): Observable<{battleItems: BattleItem[]}> {
    return this.http.get<{battleItems: BattleItem[]}>(`${this.baseURL}battle_items.json`).pipe(
      map((response): any => {
        return { battleItems: response || [] }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

