import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
 
const baseUrl = 'https://api.github.com/users/';
 
@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
 
  constructor(private http: HttpClient) { }
 
  async get(route: string, data?: any) {
    const url = baseUrl+route;
    let params = new HttpParams();
 
    if (data!==undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }
 
    const result = this.http.get(url, {
      responseType: 'json',
      params: params
    });
 
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }
 
  searchRepositoriesForUser(user: string) {
    return this.get(`${user}/repos`);
  }
}