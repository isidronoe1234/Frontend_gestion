import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

const URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})

export class ServiceAgremiadoService {

  getNewAgremiado: EventEmitter<any>= new EventEmitter();
  deleteAgremiado: EventEmitter<any>= new EventEmitter();
  editarAgremiado: EventEmitter<any>= new EventEmitter();

  constructor(private http: HttpClient) { }

  getAgremiados(){
    return this.http.get(`${URL}/Agremiados`);
  }

  newAgremiado(data:any){
    return this.http.post(`${URL}/newAgremiado`,data);
  }

  setNewAgremiado(agremiado:any){
    this.getNewAgremiado.emit(agremiado);
  }

  desactivarAgremiado(id:number){
    return this.http.patch(`${URL}/desactivarAgremiado/${id}`,id);
  }

  getDeleteAgremiado(id: number){
    return this.deleteAgremiado.emit(id);
  }

  updateAgremiado(id:number, data:any){
    return this.http.patch(`${URL}/updateAgremiado/${id}`,data);
  }

  setUpdateAgremiado(agremiado:any){
    this.editarAgremiado.emit(agremiado);
   
    
  }

  getAgremiadosArchivados(){
    return this.http.get(`${URL}/AgremiadosArchivados`);
  }
  
  activarAgremiado(id:number){
    return this.http.patch(`${URL}/activarAgremiado/${id}`,id);
  }
}
