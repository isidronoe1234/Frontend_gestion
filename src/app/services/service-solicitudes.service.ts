import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ServiceSolicitudesService {

  getNewSolicitud: EventEmitter<any>= new EventEmitter();

  constructor(private http: HttpClient) { }

  newSolicitud(solicitud: any) {
    return this.http.post(`${URL}/newSolicitud`, solicitud);
  }

  setNewSolicitud(solicitud:any){
    this.getNewSolicitud.emit(solicitud);
  }

  getSolicitudes() {
    const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
    const userNUE= userData.NUE;
    return this.http.get(`${URL}/Solicitud/${userNUE}`);
  }

  getAllSolicitudes(){
    return this.http.get(`${URL}/Solicitudes`);
  }

  dowlandArchivo(rutaArchivo: string): Observable<ArrayBuffer> {
    const url = `${URL}/dowlandArchivo/${rutaArchivo}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
