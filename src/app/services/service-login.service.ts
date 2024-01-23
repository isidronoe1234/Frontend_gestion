import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor(private http:HttpClient) { }

  login(data: any) {
    return this.http.post(`${URL}/loginUser`, data);
  }

  guardar_user(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated() {
    const user = localStorage.getItem('user');
    return JSON.parse(user || 'null') || null;
  }

  getUserDataFromLocalStorage(): any {
    const userDataString = localStorage.getItem('user'); 
  }
}
