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


  // public descargarSolicitud(ruta_archivo: string) {
  //   // Divide la ruta_archivo por las barras para obtener el nombre del archivo
  //   const partes = ruta_archivo.split('/');
  //   const nombreArchivo = partes[partes.length - 1];
    
  //   this.service.dowlandArchivo(nombreArchivo).subscribe(
  //     (response: any) => {
  //       // Crea un objeto Blob y URL para descargar el archivo
  //       const blob = new Blob([response], { type: response.type });
  //       const url = window.URL.createObjectURL(blob);
        
  //       // Crea un enlace <a> para descargar el archivo
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = nombreArchivo; // Establece el nombre del archivo
  //       a.style.display = 'none';
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     },
  //     (error) => {
  //       console.error('Error downloading file:', error);
  //     }
  //   );
  // }


  descargarSolicitud(ruta_archivo: string) {
    const partes = ruta_archivo.split('/');
    const nombreArchivo = partes[partes.length - 1];
  
    this.service.dowlandArchivo(nombreArchivo).subscribe(
      (response: any) => {
        // Crear un blob con los datos de la respuesta
        const blob = new Blob([response], { type: 'application/octet-stream' });
  
        // Crear una URL del blob y crear un enlace
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = nombreArchivo;
  
        // Agregar el enlace al DOM y simular un clic para iniciar la descarga
        document.body.appendChild(downloadLink);
        downloadLink.click();
  
        // Limpiar y liberar recursos
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
  
  

  

  

  
  
  

}

