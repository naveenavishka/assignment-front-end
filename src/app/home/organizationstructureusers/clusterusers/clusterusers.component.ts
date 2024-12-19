import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
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
  selector: 'app-clusterusers',
  templateUrl: './clusterusers.component.html',
  styleUrls: ['./clusterusers.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class ClusterusersComponent {
  @Input() clusterList: Cluster[]
  @ViewChild('sbuTable') table: Table; // Access the table component

  SBUList: any[] = []
  SitesList: any[] = []
  ClusterUserList: any[] = []


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
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['clusterList'] && this.clusterList) {
      this.clusterDataList = this.clusterList.map(m => {
        return {
          label: m.varClusterName,
          value: m.varClusterCode
        };
      });
  
    }
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
    this.LoadClusterUserList()
  }

  LoadClusterUserList() {
    var usercat = new userCatFIlter();
    usercat.varFiltergroup = "cluster"
    usercat.varUserCode = "A0213"
    usercat.varClusterCode = this.varClusterCode
    this.masterService.GetUserListByCategory(usercat).subscribe(userList => {
      this.ClusterUserList = userList.RefInfor
      this.ClusterUserList.forEach(item => {
        item.severity = this.roleUtilService.getSeverity(item.varUserRole)
      })
      console.log(this.ClusterUserList)
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
        this.promoteuserModal.promoteType = "Cluster"
        this.promoteuserModal.varClusterCode = this.varClusterCode
        this.promoteuserModal.varUserCode = sbuUser.varUserCode
        this.masterService.DemoteUser(this.promoteuserModal).subscribe(RefInfor => {
          if(RefInfor.RefInfor === "user not found"){
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
          }else if(RefInfor.RefInfor === "deleted"){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cluster User Deleted!', life: 3000 });
            this.LoadClusterUserList()
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
      if(RefInfor.RefInfor === "user not found"){
        this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'User Not Found!', life: 3000 });
      }else{
        this.LoadClusterUserList()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site User Added!', life: 3000 });
        this.cancel()
      }
    });

  }
}
