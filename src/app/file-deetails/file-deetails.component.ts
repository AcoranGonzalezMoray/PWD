import {Component, Input} from '@angular/core';
import {FileUpload} from "../services/firestore/interfaces/file-upload/file-upload.module";
import {FileUploadService} from "../services/firestore/file-upload.service";

@Component({
  selector: 'app-file-deetails',
  templateUrl: './file-deetails.component.html',
  styleUrls: ['./file-deetails.component.css']
})
export class FileDeetailsComponent {
  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: FileUploadService) { }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
