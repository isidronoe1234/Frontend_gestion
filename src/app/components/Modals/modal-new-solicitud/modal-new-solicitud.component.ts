import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModalService } from 'src/app/services/service-modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceSolicitudesService } from 'src/app/services/service-solicitudes.service';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';

@Component({
  selector: 'app-modal-new-solicitud',
  templateUrl: './modal-new-solicitud.component.html',
  styleUrl: './modal-new-solicitud.component.css'
})
export class ModalNewSolicitudComponent {

  Form_solicitud!: FormGroup;
  selectedFile: File | null = null;
  solicitudes: any[] = [];

  constructor(private fb: FormBuilder, private modalService: ServiceModalService, private solicitudservice: ServiceSolicitudesService, private alertService: ServiceAlertasService) {
    const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
    const userNUE = userData.NUE;
    this.Form_solicitud = this.fb.group({
      NUE: [userNUE],
    });

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      this.selectedFile = file;
    } else {
      console.log('Solo se aceptan archivos menor a 2MB');
    }
  }

  guardar() {    
    if (this.selectedFile) {
      const formdata = new FormData();
      let data = this.Form_solicitud.getRawValue();
      for (const datakey in data) {
        formdata.append(datakey, data[datakey]);
      }
      formdata.append('ruta_archivo', this.selectedFile);
      this.solicitudservice.newSolicitud(formdata).subscribe((response) => {
        this.solicitudservice.setNewSolicitud(response);
        this.alertService.generateAlert({
          title: 'Operación exitosa', text: 'Se ha guardado correctamente la solicitud', icon: 'success', showConfirmButton: true
        })
        this.modalService.closeModalNewSolicitud();
      },(error)=>{
        this.alertService.generateAlert({
          title: 'Fallo en la operación', text: 'Ha ocurrido un error al guardar tu solcitiud', icon: 'error', showConfirmButton: true
        })
      });
    }
  }


  cerrarModal() {
    this.modalService.closeModalNewAgremiado();
  }

}
