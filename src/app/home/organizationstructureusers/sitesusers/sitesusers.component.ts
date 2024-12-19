import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cluster } from 'src/app/models/cluster';
import { SBU } from 'src/app/models/sbu';
import { Site } from 'src/app/models/site';
import { userCatFIlter } from 'src/app/models/userCatFIlter';
import { UserPromote } from 'src/app/models/UserPromote';
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
  selector: 'app-sitesusers',
  templateUrl: './sitesusers.component.html',
  styleUrls: ['./sitesusers.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class SitesusersComponent {
  @Input() clusterList: Cluster[]
  @ViewChild('sbuTable') table: Table; // Access the table component

  SBUList: any[] = []
  SitesList: any[] = []
  SIteUserList: any[] = []

  promoteuserModal: PromoteUserModal = { modalVisibility: false, promoteType: "SiteOHSOfficer" }

  cols: any[] = []

  SiteName: string = ""
  varClusterCode: string = '';
  varSBUCode: string = '';
  varSIteCode: string = '';

  addModelValues: Cluster = {
    varGroupCode: "",
    varClusterCode: "",
    varClusterName: "",
    bitActive: true
  }
  clusterDataList: any[] = []
  SBUDataList: any[] = []
  SiteDataList: any[] = []
  NewModalDialog: boolean = false

  constructor(private masterService: MasterService, private confirmationService: ConfirmationService, private messageService: MessageService, private roleUtilService: RoleUtil) { }

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

    this.promoteuserModal = { modalVisibility: false, promoteType: "SiteOHSOfficer" }

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
    this.masterService.GetSiteListByUser("admin", this.varSBUCode).subscribe(siteData => {
      if (siteData.RefInfor.length > 0) {
        this.SitesList = siteData.RefInfor;
        this.SiteDataList = this.SitesList.map(m => {
          return {
            label: m.varSiteName,
            value: m.varSiteCode
          };
        });
      }
    });
  }


  LoadSIteUserList() {
    var usercat = new userCatFIlter();
    usercat.varFiltergroup = "site"
    usercat.varUserCode = "A0213"
    usercat.varSIteCode = this.varSIteCode
    this.masterService.GetUserListByCategory(usercat).subscribe(userList => {
      this.SIteUserList = userList.RefInfor
      this.SIteUserList.forEach(item => {
        item.severity = this.roleUtilService.getSeverity(item.varUserRole)
      })
    });
  }


  toggleAddNewModal() {
    this.promoteuserModal = {
      modalVisibility: !this.promoteuserModal.modalVisibility,
      varClusterCode: this.varClusterCode,
      varSBUCode: this.varSBUCode,
      varSIteCode: this.varSIteCode,
    }
  }

  removeUser(siteUser: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to remove user as: ${siteUser.severity.text}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.promoteuserModal.promoteType = "Site"
        this.promoteuserModal.varSBUCode = this.varSBUCode
        this.promoteuserModal.varSIteCode = this.varSIteCode
        this.promoteuserModal.varUserCode = siteUser.varUserCode
        const { modalVisibility, ...promoteUserData } = this.promoteuserModal;
        this.masterService.DemoteUser(promoteUserData).subscribe(RefInfor => {
          if (RefInfor.RefInfor === "user not found") {
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
          } else if (RefInfor.RefInfor === "deleted") {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site User Deleted!', life: 3000 });
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
    const { modalVisibility, ...promoteUserData } = this.promoteuserModal;
    this.masterService.PromoteUser(promoteUserData).subscribe(RefInfor => {
      if (RefInfor.RefInfor === "user not found") {
        this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
      } else {
        this.LoadSIteUserList()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site User Added!', life: 3000 });
        this.cancel()
      }
    });

  }
}
