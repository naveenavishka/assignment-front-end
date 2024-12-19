import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cluster } from 'src/app/models/cluster';
import { SBU } from 'src/app/models/sbu';
import { Site } from 'src/app/models/site';
import { userCatFIlter } from 'src/app/models/userCatFIlter';
import { MasterService } from 'src/app/services/master.service';
import { RoleUtil } from 'src/app/utilservices/role';


interface PromoteUserModal {
  modalVisibility: boolean;
  varClusterCode?: string;
  varSBUCode?: string;
  varSIteCode?: string;
  varUserStatus?: string;
  varUserCode?: string;
  promoteType?: string;
}

@Component({
  selector: 'app-sbuusers',
  templateUrl: './sbuusers.component.html',
  styleUrls: ['./sbuusers.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SbuusersComponent {
  @Input() clusterList: Cluster[]
  @ViewChild('sbuTable') table: Table; // Access the table component

  SBUList: any[] = []
  SitesList: any[] = []
  SBUUserList: any[] = []


  promoteuserModal: PromoteUserModal = { modalVisibility: false, promoteType: "SiteOHSOfficer" }

  cols: any[] = []
  SBUName: string = ""
  varClusterCode: string = '';
  varSBUCode: string = '';
  addModelValues: Cluster = {
    varGroupCode: "",
    varClusterCode: "",
    varClusterName: "",
    bitActive: true
  }
  clusterDataList: any[] = []
  SBUDataList: any[] = []
  NewModalDialog: boolean = false

  constructor(private masterService: MasterService, private confirmationService: ConfirmationService, private messageService: MessageService, private roleUtilService: RoleUtil ) { }

  cancel() {
    this.promoteuserModal = { modalVisibility: false }
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
    this.LoadSBUList("admin")
  }

  LoadSBUList(varUserCode: string) {
    console.log(this.varClusterCode)
    this.masterService.GetSBUListByUser(varUserCode, this.varClusterCode).subscribe(sbuData => {
      if (sbuData.RefInfor.length > 0) {
        this.SBUList = sbuData.RefInfor;

        this.SBUDataList = this.SBUList.map(m => {
          return {
            label: m.varSBUName,
            value: m.varSBUCode
          };
        });
      }
    });
  }
  LoadSItesList() {
    this.SBUName = this.SBUList.find(item => item.varSBUCode === this.varSBUCode).varSBUName || ""
    this.masterService.GetSiteListByUser("admin", this.varSBUCode).subscribe(siteData => {
      if (siteData.RefInfor.length > 0) {
        this.SitesList = siteData.RefInfor;

        console.log(this.SitesList)
      }
      console.log(siteData.RefInfor)

    });
  }
  LoadSIteUserList() {
    var usercat = new userCatFIlter();
    usercat.varFiltergroup = "sbu"
    usercat.varUserCode = "A0213"
    usercat.varSBUCode = this.varSBUCode
    this.masterService.GetUserListByCategory(usercat).subscribe(userList => {
      this.SBUUserList = userList.RefInfor
      this.SBUUserList.forEach(item => {
        item.severity = this.roleUtilService.getSeverity(item.varUserRole)
      })
      console.log(this.SBUUserList)
    });
  }

  toggleAddNewModal() {
    this.promoteuserModal = {
      modalVisibility: !this.promoteuserModal.modalVisibility,
      varClusterCode: this.varClusterCode,
      varSBUCode: this.varSBUCode,
    }
  }

  removeUser(sbuUser: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to remove user as: ${sbuUser.severity.text}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.promoteuserModal.promoteType = "SBU"
        this.promoteuserModal.varSBUCode = this.varSBUCode
        this.promoteuserModal.varUserCode = sbuUser.varUserCode
        this.masterService.DemoteUser(this.promoteuserModal).subscribe(RefInfor => {
          if(RefInfor.RefInfor === "user not found"){
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
          }else if(RefInfor.RefInfor === "deleted"){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'SBU User Deleted!', life: 3000 });
            this.LoadSIteUserList()
          }
        })
      }
    });
  }


  PromoteUserAction(userData: NgForm) {
    if (userData.invalid) {
      Object.keys(userData.controls).forEach(field => {
        const control = userData.controls[field];
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      });
      return;
    }
    // const { modalVisibility, ...promoteUserData } = this.promoteuserModal;
    this.masterService.PromoteUser(this.promoteuserModal).subscribe(RefInfor => {
      if(RefInfor.RefInfor === "user not found"){
        this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
      }else{
        this.LoadSIteUserList()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site User Added!', life: 3000 });
        this.cancel()
      }
    });

  }
}
