import { Component } from '@angular/core';
import { ServiceSolicitudesService } from 'src/app/services/service-solicitudes.service';

@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent {

  constructor(private service:ServiceSolicitudesService){}


  descargarSolicitud(ruta_archivo: string) {
    console.log(ruta_archivo);
    
    const partes = ruta_archivo.split('/');
    const nombreArchivo = partes[partes.length - 1];
  
    this.service.dowlandArchivo(nombreArchivo).subscribe(
      (response: any) => {
        console.log('Exito');
        
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
