import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceSolicitudesService } from 'src/app/services/service-solicitudes.service';
declare var $: any;
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {

  solicitudes: any[] = [];
  loading: boolean = true;

  solicitudesFiltradas: any[] = [];
  originalSolicitudes: any[] = [];
  filtrando: boolean = false;


  constructor(private solicitudService: ServiceSolicitudesService, private solicitudservice: ServiceSolicitudesService, private fb: FormBuilder) {

  }

  filtroForm = this.fb.group({
    fechaInicio: [''],
    fechaFin: ['']
  });

  ngOnInit(): void {
    this.getSolicitudes();
  }

  ngOnDestroy(): void {
    $('#table-data-solicitudes').DataTable().destroy();
  }

  getSolicitudes(): void {
    this.loading = true;
    this.solicitudService.getAllSolicitudes().subscribe((data: any) => {
      console.log(data);

      this.solicitudes = data;
      this.originalSolicitudes = data;
      this.solicitudes.reverse();
      $('#table-data-solicitudes').DataTable().destroy();
      this.inicializarDataTable();
    }, (error) => {
      console.log(error);
    },
      () => {
        this.loading = false;
      });
  }

  filtrarPorFechas() {
    const fechaInicio = this.filtroForm.get('fechaInicio')?.value;
    const fechaFin = this.filtroForm.get('fechaFin')?.value;

    console.log(fechaInicio);
    console.log(fechaFin);

    if (!fechaInicio && !fechaFin) {
      this.filtrando = false;
      this.solicitudes = this.originalSolicitudes;
    } else {
      this.filtrando = true;
      this.solicitudesFiltradas = this.originalSolicitudes.filter(solicitud => {
        const fechaSolicitud = new Date(solicitud.fecha_solicitud);
        return (!fechaInicio || fechaSolicitud >= new Date(fechaInicio)) &&
          (!fechaFin || fechaSolicitud <= new Date(fechaFin));
      });

      this.solicitudes = this.solicitudesFiltradas;
      console.log(this.solicitudes);
      $('#table-data-solicitudes').DataTable().destroy();
      this.inicializarDataTable();
    }
  }


  quitarFiltro() {
    this.filtrando = false;
    this.solicitudes = this.originalSolicitudes;
    this.filtroForm.reset();
    this.inicializarDataTable();
  }


  private inicializarDataTable(): void {
    $('#table-data-solicitudes').DataTable().destroy();
    setTimeout(() => {
      var table = $('#table-data-solicitudes').DataTable({
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


}
