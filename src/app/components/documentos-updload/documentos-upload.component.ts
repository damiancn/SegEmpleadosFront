import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-documentos-upload',
  templateUrl: './documentos-upload.component.html',
  styleUrls: ['./documentos-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
})
export class DocumentosUploadComponent implements OnInit {
  @Input() typing: boolean | null;
  @Input() idDoc: string;
  @Output() tipoArchivo = new EventEmitter<any>();
  @Output() borrarArchivo = new EventEmitter<string>();
  @Output() descargar = new EventEmitter<any>();


  nuevo: boolean = false;
  borrar: boolean = false;
  idArchivo: number = 0;
  nomArchivo: string = '';
  extensionArchivo: string = '';
  nombreArchivo: string = '';
  mimetype: string = '';
  filesList = false;
  filesEv = false;

  targetDelete: string;

  globalFileEv: any = null
  globalFileList: any = null

  img: string;
  inpAux: string

  base64: string;
  fileUploaded: any = null;

  fileNameB: string;
  constructor() { }

  ngOnInit(): void {
    this.inpAux = this.idDoc + "-aux";
    this.img = this.idDoc + '-img';
  }

  evidenceUpload() {
    setTimeout(() => {
      document.getElementById(this.idDoc)?.click();
    }, 25);
  }

  uploadFile() {
    if (this.evidenceChange()) {
      setTimeout(() => {
        this.setImage()
        this.disableInput()
        this.enviarArchivo(this.fileUploaded);
      }, 200);
    } else {
    }
  }
  //#region new files

  renderImg() {
    let auxInp = document.getElementById(this.inpAux) as HTMLInputElement;
    let input = document.getElementById(this.idDoc) as HTMLInputElement;
    input.src = auxInp.src;
    //BASE64
    this.setImage();
    this.disableInput();
    this.filesEv = true;
    // alert(input.src)
  }
  setImage() {
    let aux = document.getElementById(this.inpAux) as HTMLInputElement;
    this.fileUploaded = aux.src;
    this.enviarArchivo(this.fileUploaded);
  }

  evidenceChange() {
    let evidence = document.getElementById(this.idDoc) as HTMLInputElement;
    let img = evidence.files[0];
    if (img != null) {
      let aux = document.getElementById(this.inpAux) as HTMLInputElement;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.addEventListener("load", function () {
        aux.src = this.result as any;
      })
      return true;
    } else {
      return false
    }
  }
  enviarArchivo(archivo: string) {
    console.log("🚀 ~ DocumentosUploadComponent ~ enviarArchivo ~ archivo:", archivo)
    this.tipoArchivo.emit(archivo);
  }
  cargarArchivo(fileNameB: string) {
    this.fileUploaded = fileNameB;
    this.disableInput();
  }
  deleteOpen(idDoc: string) {
    this.fileUploaded = null
    this.enableInput(idDoc)
  }
  enableInput(input,) {
    let inp = document.getElementById(this.idDoc) as HTMLInputElement;
    inp.disabled = false
  }
  disableInput() {
    let inp = document.getElementById(this.idDoc) as HTMLInputElement;
    inp.disabled = true;
  }
}