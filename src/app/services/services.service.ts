import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  getNewAgremiado: EventEmitter<any>= new EventEmitter();

  constructor(private http: HttpClient) {

   }

  login(data: any) {
    return this.http.post('http://localhost:8000/api/loginUser', data);
  }

  guardar_user(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated() {
    const user = localStorage.getItem('user'); // Obtén el usuario desde el almacenamiento local
    return JSON.parse(user || 'null') || null;
  }

  getUserDataFromLocalStorage(): any {
    const userDataString = localStorage.getItem('user');
   
  }


  newSolicitud(solicitud: any) {
    return this.http.post('http://localhost:8000/api/newSolicitud', solicitud);
  }

  getSolicitudes() {
    const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
    const userNUE= userData.NUE;
    return this.http.get(`http://localhost:8000/api/Solicitud/${userNUE}`);
  }

  dowlandArchivo(rutaArchivo: string): Observable<ArrayBuffer> {
    const url = `http://localhost:8000/api/dowlandArchivo/${rutaArchivo}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getAgremiados(){
    return this.http.get(`http://localhost:8000/api/Agremiados`);
  }

  newAgremiado(data:any){
    return this.http.post(`http://localhost:8000/api/newAgremiado`,data);
  }

  setNewAgremiado(agremiado:any){
    this.getNewAgremiado.emit(agremiado);
  }
}
