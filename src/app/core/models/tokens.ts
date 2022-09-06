import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  baseEndpoint: string;
  firebaseUrlImages: string;
  firebaseToken:string;
  emblemUrl:string;
  perPage: number;
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
