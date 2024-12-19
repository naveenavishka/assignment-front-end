import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cluster } from 'src/app/models/cluster';
import { SBU } from 'src/app/models/sbu';
import { MasterService } from 'src/app/services/master.service';

interface AddEditModal {
  AddClusterModal: boolean;
  isEditing?: boolean;
  varSBUCode?: string;
  varSBUName?: string;
  numSBUID?: number;
  varGroupCode?: "ADV";
  varClusterCode?: string,
  varEmail?: string,
  varEmailList?: string[]
}


@Component({
  selector: 'app-sbu',
  templateUrl: './sbu.component.html',
  styleUrls: ['./sbu.component.css'],
  providers: [ConfirmationService, MessageService]
})


export class SbuComponent {
  @Input() clusterList: Cluster[]
  @ViewChild('sbuTable') table: Table; // Access the table component

  SBUList: any[] = []
  addedtiModal: AddEditModal = { AddClusterModal: false }
  emailModal: AddEditModal = { AddClusterModal: false }

  newEmail: string = ''

  AddClusterModal: any = { add: false, edit: false }
  cols: any[] = []
  clusterName: string = ""
  varClusterCode: string = '';
  addModelValues: Cluster = {
    varGroupCode: "",
    varClusterCode: "",
    varClusterName: "",
    bitActive: true
  }
  clusterDataList: any[] = []
  NewModalDialog: boolean = false

  constructor(private masterService: MasterService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  cancel() {
    this.addedtiModal = { AddClusterModal: false, isEditing: false, varSBUCode: "", varSBUName: "", numSBUID: 0 }
    //this.AddClusterModal = { add: false, edit: false }
  }

  ngOnInit() {

    this.clusterDataList = this.clusterList.map(m => {
      return {
        label: m.varClusterName,
        value: m.varClusterCode
      };
    });

    this.cols = [
      { field: 'varClusterCode', header: 'Cluster Code' },
      { field: 'varSBUCode', header: 'SBU Code' },
      { field: 'varSBUName', header: 'SBU Name' },
    ];
  }

  exportCSV() {
    console.log(this.table)

    if (this.table) {
      this.table.exportCSV();
    } else {
      console.warn('Table reference is not initialized.');
    }
  }


  onClusterChange() {
    this.clusterName = this.clusterList.find(item => item.varClusterCode === this.varClusterCode)?.varClusterName || ""
    this.LoadSBUList("admin")
  }

  LoadSBUList(varUserCode: string) {
    console.log(this.varClusterCode)
    this.masterService.GetSBUListByUser(varUserCode, this.varClusterCode).subscribe(sbuData => {
      if (sbuData.RefInfor.length > 0) {
        this.SBUList = sbuData.RefInfor;
      }
      this.SBUList.forEach(sbu => {
        if (sbu.varEmail) {
          sbu.varEmailList = sbu.varEmail.trim().split(';').filter((item: any) => item !== "")
        } else {
          sbu.varEmailList = [];
        }
      });

    });
  }
  getEMailList(emailList: string) {
    return emailList.split(";")
  }
  toggleAddNewModal() {
    this.addedtiModal = {
      AddClusterModal: !this.addedtiModal.AddClusterModal,
      isEditing: false,
      varSBUCode: "",
      varSBUName: "",
      numSBUID: 0
    }
  }
  toggleemailModal(singleSBU: SBU) {
    this.emailModal = {
      AddClusterModal: !this.emailModal.AddClusterModal,
      isEditing: true,
      numSBUID: singleSBU.numSBUID,
      varSBUCode: singleSBU.varSBUCode,
      varEmail: singleSBU.varEmail || "",
      varEmailList: singleSBU.varEmailList
    }
  }

  deleteSBU(singleSBU: SBU) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete SBU: ${singleSBU.varSBUName} SBU?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.DeleteSBU({ varSBUCode: singleSBU.varSBUCode, varClusterCode: singleSBU.varClusterCode }).subscribe(RefInfor => {
          if (RefInfor.RefInfor === "Success") {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'SBU  Deleted!', life: 3000 });
            this.LoadSBUList("admin")
          } else if (RefInfor.RefInfor === "Fail") {
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'SBU Not Found!', life: 3000 });
          }
        })
      }
    });
  }
  editSBU(singleSBU: SBU) {
    this.addedtiModal = {
      AddClusterModal: !this.addedtiModal.AddClusterModal,
      isEditing: true,
      varSBUCode: singleSBU.varSBUCode,
      varSBUName: singleSBU.varSBUName,
      numSBUID: singleSBU.numSBUID
    }
  }

  onRemoveChip(email: string) {
    this.emailModal = { ...this.emailModal, varEmailList: (this.emailModal.varEmailList ?? []).filter(item => item !== email) }
  }
  addEmailToLst() {
    if (this.newEmail === "") {
      this.messageService.add({ severity: 'error', summary: 'email required', detail: 'Please enter an email address', life: 3000 });
      return;
    }
    if (this.emailModal.varEmailList?.includes(this.newEmail)) {
      this.messageService.add({ severity: 'error', summary: 'Duplicate email', detail: 'Cannot enter duplicate emails', life: 3000 });
      return;
    }

    this.emailModal.varEmailList?.push(this.newEmail)
    this.newEmail = ""
  }


  addEditAction(sbuform: NgForm) {
    if (sbuform.invalid) {
      Object.keys(sbuform.controls).forEach(field => {
        const control = sbuform.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return; // If the form is invalid, prevent submission
    }

    this.masterService.addEditSBU({
      numSBUID: this.addedtiModal.numSBUID,
      varClusterCode: this.varClusterCode,
      varSBUCode: this.addedtiModal.varSBUCode,
      varSBUName: this.addedtiModal.varSBUName,
    }).subscribe(sbuData => {
      if (sbuData.RefInfor === "updated" || sbuData.RefInfor === "added") {
        this.LoadSBUList('admin')
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'SBU ' + sbuData.RefInfor + "!", life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: sbuData.RefInfor + "!", life: 3000 });
      }
    });
  }

  UpdateEmailListAction() {
    this.masterService.UpdateEmailList({
      varSBUCode: this.emailModal.varSBUCode,
      varEmail: this.emailModal.varEmailList?.join(';'),
    }).subscribe(sbuData => {
      if (sbuData.RefInfor === "Success") {
        this.LoadSBUList('admin')
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'SBU ' + sbuData.RefInfor + "!", life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: sbuData.RefInfor + "!", life: 3000 });
      }
    });
  }

}
