import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ruta_archivos: string='sKgnJrNIUq47zuAh2Uq15BrHsOVcR8W3yPF8ZUng.pdf'

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
    return !!user; // Devuelve true si el usuario está autenticado
  }


  newSolicitud(solicitud: any) {
    return this.http.post('http://localhost:8000/api/newSolicitud', solicitud);
  }

  getSolicitudes() {
    const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
    const userNUE= userData.NUE;
    return this.http.get(`http://localhost:8000/api/Solicitud/${userNUE}`);
  }


  // dowlandArchivo(ruta_archivo:any){

  //   return this.http.get(`http://localhost:8000/api/dowlandArchivo/${ruta_archivo}`);
  // }

  dowlandArchivo(rutaArchivo: string): Observable<ArrayBuffer> {
    const url = `http://localhost:8000/api/dowlandArchivo/${rutaArchivo}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
