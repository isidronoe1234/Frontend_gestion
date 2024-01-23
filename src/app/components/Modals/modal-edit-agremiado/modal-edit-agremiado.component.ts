import { Component, Input } from '@angular/core';
import { ServiceAgremiadoService } from 'src/app/services/service-agremiado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import { ServiceModalService } from 'src/app/services/service-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-agremiado',
  templateUrl: './modal-edit-agremiado.component.html',
  styleUrl: './modal-edit-agremiado.component.css'
})



export class ModalEditAgremiadoComponent {

  @Input() agremiado: any;
  cuotaMarcada: boolean = false;

  constructor(
    private agremiadoservice: ServiceAgremiadoService,
    private fb: FormBuilder,
    private alertService: ServiceAlertasService,
    private modalService: ServiceModalService) {
  }

  ngOnInit(): void {
    this.Formulario_edit_agremiado.reset(this.agremiado);
    console.log(this.Formulario_edit_agremiado.get('cuota')?.value);
    // Mueve la lógica después de la llamada a reset
    console.log(this.Formulario_edit_agremiado.get('cuota')?.value);
  }

  sololetras = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$';
  sololetras_y_numeros = '^[a-zA-Z0-9]+$';
  solonumeros = '^[0-9]+$';
  sololetrasConEspacio = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$';

  Formulario_edit_agremiado: FormGroup = this.fb.group({
    a_paterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    a_materno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    nombre: ['', [Validators.required, Validators.min(3), Validators.maxLength(20), Validators.pattern(this.sololetrasConEspacio)]],
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


  edit_agremiado() {
    if (this.Formulario_edit_agremiado.invalid) {
      this.Formulario_edit_agremiado.markAllAsTouched();
      return;
    }
    Swal.fire({
      title: '¿Estás seguro de modificar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agremiadoservice.updateAgremiado(this.agremiado.id, this.Formulario_edit_agremiado.value).subscribe((data: any) => {
          this.alertService.generateAlert({
            title: 'Operación exitosa', text: 'Se ha editado correctamente el usuario', icon: 'success', showConfirmButton: true
          });
          this.modalService.closeModalEditAgremiado();
          this.agremiadoservice.setUpdateAgremiado(data);
        }, (error) => {
          this.alertService.generateAlert({
            title: 'Fallo en la operación', text: 'Ha ocurrido un error al editar al usuario', icon: 'error', showConfirmButton: true
          });
        })
      }
    });
  }



  cerrarModal() {
    this.modalService.closeModalEditAgremiado();
  }
}
