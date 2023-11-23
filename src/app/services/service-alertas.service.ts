import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceAlertasService {

  constructor() { }

  async generateAlert(op: any) {
    await Swal.fire({
      title: op.title,
      text: op.text,
      icon: op.icon,
      showConfirmButton: op.showConfirmButton,
    });
  }
}
