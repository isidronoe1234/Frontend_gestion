import { Component } from '@angular/core';
import { ServiceAgremiadoService } from 'src/app/services/service-agremiado.service';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agremiados-archivados',
  templateUrl: './agremiados-archivados.component.html',
  styleUrls: ['./agremiados-archivados.component.css']
})
export class AgremiadosArchivadosComponent {

  agremiadosArchivados: any[] = [];
  loading: boolean = true;

  constructor(private agremiadoservice: ServiceAgremiadoService, private alertService: ServiceAlertasService) {

    this.agremiadoservice.deleteAgremiado.subscribe((id: number) => {
      if (id) {
        this.agremiadosArchivados = this.agremiadosArchivados.filter(u => u.id !== id);
        this.getAgremiadosArchivados();
      }
    });
  }

  ngOnInit(): void {
    this.getAgremiadosArchivados();

  }

  ngOnDestroy(): void {
    $('#table-data-agremiados-archivados').DataTable().destroy();
  }

  getAgremiadosArchivados(): void {
    this.loading = true;
    this.agremiadoservice.getAgremiadosArchivados().subscribe((data: any) => {
      this.agremiadosArchivados = data;
      this.agremiadosArchivados.reverse();
      $('#table-data-agremiados-archivados').DataTable().destroy();
      setTimeout(() => {
        var table = $('#table-data-agremiados-archivados').DataTable({
          language: {
            url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
          },
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu: [5, 10, 25],
          responsive: true,
          dom: 'lBfrtip',
          buttons: [
            {
              extend: 'print',
              text: '<i class="fa-solid fa-print"></i> Imprimir',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              },
              className: 'btn-primary'
            },
            {
              extend: 'pdf',
              text: '<i class="fa-solid fa-file-pdf"></i> PDF',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              },
              className: 'btn-danger'
            },
            {
              extend: 'excel',
              text: '<i class="fa-solid fa-file-excel"></i> Excel',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              },
              className: 'btn-success'
            },
          ],
          initComplete: function () {
            $('.dataTables_filter').addClass('float-start').css('margin-top', '1%');
            $('.form-control-sm').css('width', '400px');
            $('.dt-buttons, .buttons-print, .buttons-pdf, .buttons-excel')
              .addClass('float-end')
              .css({ 'margin-bottom': '1%', 'margin-right': '5px', 'border-radius': '5px', 'color': 'white' });
            $('.dataTables_info').addClass('float-start');
            $('.pagination').addClass('float-end');
          }
        });
      });
    }, (error) => {
      console.log(error);
    },
      () => {
        this.loading = false;
      }
    );
  }


  activar_agremiado(id: number) {
    Swal.fire({
      title: '¿Estás seguro de habilitar esté agremiado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agremiadoservice.activarAgremiado(id).subscribe((data: any) => {
          this.agremiadoservice.getDeleteAgremiado(id);
          this.alertService.generateAlert({
            title: 'Operación exitosa', text: 'Se ha habilitado el usuario', icon: 'success', showConfirmButton: true
          })
        }, (error) => {
          this.alertService.generateAlert({
            title: 'Fallo en la operación', text: 'Ha ocurrido un error al habilitar al usuario', icon: 'error', showConfirmButton: true
          })
        })
      }
    });
  }

}
