import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceSolicitudesService } from '../../../services/service-solicitudes.service';
import { ServiceModalService } from 'src/app/services/service-modal.service';

declare var $: any;
@Component({
  selector: 'app-home-principal-agremiado',
  templateUrl: './home-principal-agremiado.component.html',
  styleUrl: './home-principal-agremiado.component.css'
})
export class HomePrincipalAgremiadoComponent {

  selectedFile: File | null = null;
  solicitudes: any[] = [];
  loading: boolean = true;


  constructor( private solicitudservice: ServiceSolicitudesService, private modalService: ServiceModalService) {

    this.solicitudservice.getNewSolicitud.subscribe(solicitud => {
      if (solicitud) {
        this.solicitudes.push(solicitud);
        this.getSolicitudes();
      }
    });
    

  }

  ngOnInit(): void {
    this.getSolicitudes();

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  ngOnDestroy(): void {
    $('#table-solicitudes-user').DataTable().destroy();
  }


  getSolicitudes() {
    this.loading = true;
    this.solicitudservice.getSolicitudes().subscribe((data: any) => {
      this.solicitudes = data;
      console.log(this.solicitudes);
      
      this.solicitudes.reverse();
      $('#table-solicitudes-user').DataTable().destroy();
      setTimeout(() => {
        var table = $('#table-solicitudes-user').DataTable({
          language: {
            url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
          },
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu: [5, 10, 25],
          responsive: true,

          initComplete: function () {
            $('.dataTables_filter').addClass('float-end').css('margin-top', '1%');
            $('.form-control-sm').css('width', '250px');
            $('.dt-buttons, .buttons-print, .buttons-pdf, .buttons-excel')
              .addClass('float-end')
              .css({ 'margin-bottom': '1%', 'margin-right': '5px', 'border-radius': '5px', 'color': 'white' });
            $('.dataTables_info').addClass('float-start');
            $('.pagination').addClass('float-end');
          }
        });
      });
    }, (error)=>{
      console.log(error);
      
    },()=>{
      this.loading = false;
    })
  }


  descargarSolicitud(ruta_archivo: string) {
    const partes = ruta_archivo.split('/');
    const nombreArchivo = partes[partes.length - 1];
  
    this.solicitudservice.dowlandArchivo(nombreArchivo).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
  
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = nombreArchivo;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el archivo', error);
      }
    );
  }

  openNewSolicitudModal() {
    this.modalService.openModalNewSolicitud();
  }
}
