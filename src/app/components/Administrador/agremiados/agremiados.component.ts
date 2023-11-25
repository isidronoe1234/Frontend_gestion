import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import { ServicesService } from 'src/app/services/services.service';
import { ModalNewAgremiadoComponent } from '../../Modals/modal-new-agremiado/modal-new-agremiado.component';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceModalService } from 'src/app/services/service-modal.service';

declare var $: any;
@Component({
  selector: 'app-agremiados',
  templateUrl: './agremiados.component.html',
  styleUrls: ['./agremiados.component.css']
})
export class AgremiadosComponent {

  agremiados: any[] = [];

  modalRef!: BsModalRef;

  constructor(private service: ServicesService, private modalService: ServiceModalService) {

    this.service.getNewAgremiado.subscribe(agremiado => {
      if (agremiado) {
        this.agremiados.push(agremiado);
        this.getAgremiados();
      }
    })
  }



  ngOnInit(): void {
    this.getAgremiados();

  }

  ngOnDestroy(): void {
    $('#table-data-agremiados').DataTable().destroy();
  }

  getAgremiados(): void {
    this.service.getAgremiados().subscribe((data: any) => {
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
          // dom: 'lBfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: '<i class="fa-solid fa-print"></i> Imprimir',
          //   }
          // ],

        });
        table.buttons().container()
          .appendTo('#table-data-agremiados_wrapper .col-md-6:eq(0)');
      });
    }, (error) => {
      console.log(error);
    });
  }



  update_agremiado(id: number) {

  }

  delete_agremiado(id: number) {

  }

  salir() {

  }

  openNewCategoryModal() {
    this.modalService.openModal();
  }

}
