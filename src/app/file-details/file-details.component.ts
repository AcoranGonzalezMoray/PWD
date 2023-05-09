import { Component, Input} from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { FileUpload } from '../interfaces/file-upload/file-upload.module';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss'],
})
export class FileDetailsComponent {

  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: FileUploadService) { }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
