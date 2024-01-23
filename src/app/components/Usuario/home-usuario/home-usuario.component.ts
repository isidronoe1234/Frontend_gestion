import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceSolicitudesService } from '../../../services/service-solicitudes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {

  pestanaSeleccionada: string = 'solicitudes';

  seleccionarPestana(pestana: string) {
    this.pestanaSeleccionada = pestana;
  }

  cerrarMenu(): void {
    const navBar = document.querySelector('.navbar-collapse');
    if (navBar && navBar.classList.contains('show')) {
      navBar.classList.remove('show');
    }
  }

  Form_solicitud!: FormGroup;
  selectedFile: File | null = null;
  solicitudes: any[] = [];

  constructor(private fb: FormBuilder, private solicitudservice: ServiceSolicitudesService, private router:Router) {
    const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
    const userNUE = userData.NUE;
    this.Form_solicitud = this.fb.group({
      NUE: [userNUE],
    });

    this.getSolicitudes();

  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
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
        console.log(response);
      });
    } else {
      console.log('No se ha seleccionado un archivo.');
    }
  }

  ngOnDestroy(): void {
    $('#table-solicitudes-user').DataTable().destroy();
  }


  getSolicitudes() {
    this.solicitudservice.getSolicitudes().subscribe((data: any) => {
      this.solicitudes = data;
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

  cerrarSesion(): void {
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: 'Cerrando sesión...',
          icon: 'info',
          showCancelButton: false,
          showConfirmButton: false
        })
        setTimeout(() => {
          this.router.navigateByUrl('/home-principal')
          Swal.fire('Sesión cerrada', '', 'success');
        }, 2000);

      }
    });
  }

}

