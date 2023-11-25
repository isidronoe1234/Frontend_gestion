import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalNewAgremiadoComponent } from '../components/Modals/modal-new-agremiado/modal-new-agremiado.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceModalService {

  private modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal) { }

  openModal() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    };
    this.modalRef = this.modalService.open(ModalNewAgremiadoComponent, modalOptions);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
