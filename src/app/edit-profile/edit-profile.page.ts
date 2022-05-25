import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalService } from '../_modal';
declare const UIkit: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editMode: boolean = false;
  
  currentEditId: string = '';
  
  @ViewChild('photoInput') photoInput: ElementRef;
  constructor(public modalSevices:ModalService) { }
  editItem(item: any): void {
    this.editMode = true;

    const itemModal = document.getElementById('employee-modal');
    if (itemModal) {
      itemModal.addEventListener('hidden', () => {
        this.editMode = false;
        this.currentEditId = '';
      });
      UIkit.modal(itemModal).show();
    }
  }
  imageSelected(): void {
    var selectionIsValid = true;
    const file = this.photoInput.nativeElement.files[0];

    if (this.photoInput.nativeElement.files.length != 1) {
      selectionIsValid = false;
    } else if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      alert('Your photo should either be in .png or .jpg');
      selectionIsValid = false;
    } else if (file.size > 100_000) {
      alert("Your photo's size should not exceed 100 KB");
      selectionIsValid = false;
    }

    if (selectionIsValid) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        document.documentElement.style.setProperty(
          '--photo-background',
          `url('${fileReader.result}')`
        );
      };
    } else {
      document.documentElement.style.setProperty('--photo-background', '');
    }
  }
  ngOnInit() {
  }

}
