import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import { ServicesService } from 'src/app/services/services.service';
import { ModalNewAgremiadoComponent } from '../../Modals/modal-new-agremiado/modal-new-agremiado.component';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-agremiados',
  templateUrl: './agremiados.component.html',
  styleUrls: ['./agremiados.component.css']
})
export class AgremiadosComponent {

  agremiados: any[] = [];
  dtoptions:DataTables.Settings={};
  dtTrigger:Subject<any>= new Subject<any>();
  modalRef!: BsModalRef;

  constructor(private service: ServicesService, private fb: FormBuilder, private alertService: ServiceAlertasService, private modalService: BsModalService) {
    
    this.service.getNewAgremiado.subscribe(agremiado => {
      if (agremiado) {
        this.agremiados.push(agremiado);
        this.getAgremiados();
      }
    })
  }

  ngOnInit(): void {
    this.getAgremiados();
    this.dtoptions={
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
      },
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [5, 10, 25],
      responsive: true,
      
            
    }
  }


  sololetras = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$';
  sololetras_y_numeros = '^[a-zA-Z0-9]+$';
  solonumeros = '^[0-9]+$';

  Formulario_add_agremiado: FormGroup = this.fb.group({
    a_paterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    a_materno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    nombre: ['', [Validators.required, Validators.min(3), Validators.maxLength(20), Validators.pattern(this.sololetras)]],
    sexo: ['', [Validators.required]],
    NUP: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.sololetras_y_numeros)]],
    NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.sololetras_y_numeros)]],
    NSS: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.solonumeros)]],
    RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(this.sololetras_y_numeros)]],
    f_nacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.solonumeros)]],
    cuota: ['', [Validators.required]],
  }
  );

  Mensajes_validaciones = {
    a_paterno: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 15 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    a_materno: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 15 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    nombre: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 20 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    sexo: [
      { type: 'required', message: 'El campo es requerido' },
    ],
    NUP: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    NUE: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    NSS: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 11 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 11 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener números' },
    ],
    RFC: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 13 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 13 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    f_nacimiento: [
      { type: 'required', message: 'El campo es requerido' }
    ],
    telefono: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener números' },
    ],
    cuota: [
      { type: 'required', message: 'El campo es requerido' }
    ]
  };

  getAgremiados() {
    this.service.getAgremiados().subscribe((data: any) => {
      this.agremiados = data;
      this.agremiados.reverse();
      this.dtTrigger.next(null)
    }, (error) => {
      console.log(error);

    })

  }

  add_agremiado() {
    if (this.Formulario_add_agremiado.invalid) {
      this.Formulario_add_agremiado.markAllAsTouched();
      return;
    }
    console.log(this.Formulario_add_agremiado.value);
    this.service.newAgremiado(this.Formulario_add_agremiado.value).subscribe((data: any) => {
      this.service.setNewAgremiado(data);
      this.Formulario_add_agremiado.reset();
      this.cerrarModal();
      this.alertService.generateAlert({
        title: 'Operación exitosa', text: 'Se ha registrado correctamente el usuario', icon: 'success', showConfirmButton: true
      }
      )

    }, (error) => {
      this.alertService.generateAlert({
        title: 'Fallo en la operación', text: 'Ha ocurrido un error al registrar al usuario', icon: 'error', showConfirmButton: true
      })

    })
  }

  update_agremiado(id: number) {

  }

  delete_agremiado(id: number) {

  }

  salir() {

  }

  cerrarModal(){
    // this.modalRef.hide();
  }

  openNewCategoryModal(): void {
    this.modalService.show(ModalNewAgremiadoComponent, {
      class: 'modal modal-dialog-centered modal-lg',
      // ... otras opciones según tus necesidades
    });
  }

}
