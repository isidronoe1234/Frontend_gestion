import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {

  Form_solicitud!: FormGroup;
  selectedFile: File | null = null;
  solicitudes: any[] = [];

  constructor(private fb: FormBuilder, private service: ServicesService) {
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
      this.service.newSolicitud(formdata).subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log('No se ha seleccionado un archivo.');
    }
  }


  getSolicitudes() {
    this.service.getSolicitudes().subscribe((data: any) => {
      this.solicitudes = data;
      console.log(data);

    })
  }


  descargarSolicitud(ruta_archivo: string) {
    const partes = ruta_archivo.split('/');
    const nombreArchivo = partes[partes.length - 1];
  
    this.service.dowlandArchivo(nombreArchivo).subscribe(
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

