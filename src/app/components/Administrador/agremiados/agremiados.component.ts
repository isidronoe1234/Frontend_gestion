import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import { ServiceModalService } from 'src/app/services/service-modal.service';
import Swal from 'sweetalert2';
import { ServiceAgremiadoService } from 'src/app/services/service-agremiado.service';

declare var $: any;
@Component({
  selector: 'app-agremiados',
  templateUrl: './agremiados.component.html',
  styleUrls: ['./agremiados.component.css']
})
export class AgremiadosComponent {

  agremiados: any[] = [];
  dtInstance: any;
  loading: boolean = true;


  constructor(
    private agremiadoservice: ServiceAgremiadoService,
    private modalService: ServiceModalService,
    private alertService: ServiceAlertasService,
    private cdr: ChangeDetectorRef) {

    this.agremiadoservice.getNewAgremiado.subscribe(agremiado => {
      if (agremiado) {
        this.agremiados.push(agremiado);
        this.getAgremiados();
      }
    });

    this.agremiadoservice.editarAgremiado.subscribe(agremiado => {
      console.log(agremiado);
      if (agremiado) {
        this.getAgremiados();
      }
    });


    this.agremiadoservice.deleteAgremiado.subscribe((id: number) => {
      if (id) {
        this.agremiados = this.agremiados.filter(u => u.id !== id);

        this.getAgremiados();
      }
    });
  }



  ngOnInit(): void {
    this.getAgremiados();

  }

  ngOnDestroy(): void {
    $('#table-data-agremiados').DataTable().destroy();
  }

  getAgremiados(): void {
    this.loading = true;
    this.agremiadoservice.getAgremiados().subscribe((data: any) => {
      this.agremiados = data;
      this.agremiados.reverse();
      $('#table-data-agremiados').DataTable().destroy();
      setTimeout(() => {
        var table = $('#table-data-agremiados').DataTable({
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
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                
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
          title: 'Título personalizado para imprimir',
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


  update_agremiado(item: any) {
    this.modalService.openModalEditAgremiado(item);
  }

  desactivar_agremiado(id: number) {
    Swal.fire({
      title: '¿Quieres inhabilitar esté agremiado?',
      text: 'Podras habilitarlo nuevamente si asi es necesario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agremiadoservice.desactivarAgremiado(id).subscribe((data: any) => {
          this.agremiadoservice.getDeleteAgremiado(id);
          this.alertService.generateAlert({
            title: 'Operación exitosa', text: 'Se ha inhabilitado el usuario', icon: 'success', showConfirmButton: true
          })
        }, (error) => {
          this.alertService.generateAlert({
            title: 'Fallo en la operación', text: 'Ha ocurrido un error al inhabilitar al usuario', icon: 'error', showConfirmButton: true
          })
        })
      }
    });

  }

  salir() {

  }

  openNewCategoryModal() {
    this.modalService.openModalNewAgremiado();
  }

  eliminarAgremiado(id: number) {
    // Encuentra el índice del agremiado en el array
    const index = this.agremiados.findIndex(agremiado => agremiado.id === id);

    // Si se encuentra, elimínalo del array
    if (index !== -1) {
      this.agremiados.splice(index, 1);
      this.getAgremiados();
    }
  }

}
