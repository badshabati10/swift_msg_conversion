import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AgbFileService} from "./agb-file-service";

@Component({
    selector: 'app-agb-file',
    templateUrl: './agb-file.component.html',
    styleUrls: ['./agb-file.component.scss'],
    imports: [
        ReactiveFormsModule
    ],
    standalone: true
})
export class AgbFileComponent implements OnInit {
    fileForm: FormGroup;
    selectedFile: File = null;

    constructor(private fb: FormBuilder,
                private agbFileService: AgbFileService) {
    }

    ngOnInit() {
        this.fileForm = this.fb.group({
            file: ['', [Validators.required]]
        });
    }


    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.agbFileService.uploadFile(formData).subscribe(res => {
                console.log(res);
        });
    }

    onFileSelected(event): void {
        this.selectedFile = <File>event.target.files[0];
    }

}
