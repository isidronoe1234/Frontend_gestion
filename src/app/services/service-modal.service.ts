import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalNewAgremiadoComponent } from '../components/Modals/modal-new-agremiado/modal-new-agremiado.component';
import { ModalEditAgremiadoComponent } from '../components/Modals/modal-edit-agremiado/modal-edit-agremiado.component';
import { ModalNewSolicitudComponent } from '../components/Modals/modal-new-solicitud/modal-new-solicitud.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceModalService {

  private modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal) { }

  openModalNewAgremiado() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    };
    this.modalRef = this.modalService.open(ModalNewAgremiadoComponent, modalOptions);
  }

  closeModalNewAgremiado() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openModalEditAgremiado(agremiado:any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    };
    this.modalRef = this.modalService.open(ModalEditAgremiadoComponent, modalOptions);
    this.modalRef.componentInstance.agremiado = agremiado;
    
  }

  closeModalEditAgremiado() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openModalNewSolicitud() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: '',
      centered: true
    };
    this.modalRef = this.modalService.open(ModalNewSolicitudComponent, modalOptions);
  }

  closeModalNewSolicitud() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  
}
