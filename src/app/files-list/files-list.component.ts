import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../interfaces/file-upload/file-upload.module';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
})
export class FilesListComponent  implements OnInit {

  fileUploads?: FileUpload[];
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
      this.uploadService.getFiles(10).subscribe((fileUploads: FileUpload[]) => {
        this.fileUploads = fileUploads;
      });
  }

}
