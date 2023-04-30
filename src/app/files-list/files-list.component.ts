import { Component } from '@angular/core';
import {FileUploadService} from "../services/firestore/file-upload.service";
import {map} from "rxjs/operators";
import {FileUpload} from "../services/firestore/interfaces/file-upload/file-upload.module";

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent {

  fileUploads?: FileUpload[];
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
      this.uploadService.getFiles(10).subscribe((fileUploads: FileUpload[]) => {
        this.fileUploads = fileUploads;
      });
  }
}
