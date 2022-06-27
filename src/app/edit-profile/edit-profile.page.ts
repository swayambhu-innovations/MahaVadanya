import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const UIkit: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editMode = false;
  currentEditId = '';
  isModalOpen = false;

  constructor() {}
  toggleOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

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

  ngOnInit() {}
}
