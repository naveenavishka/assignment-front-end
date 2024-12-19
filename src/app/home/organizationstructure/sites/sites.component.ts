import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cluster } from 'src/app/models/cluster';
import { SBU } from 'src/app/models/sbu';
import { Site } from 'src/app/models/site';
import { MasterService } from 'src/app/services/master.service';


interface AddEditModal {
  AddSiteModal: boolean;
  isEditing?: boolean;
  siteCode?: string;
  SiteName?: string;
  siteID?: number;
  numSiteID?: number;
  varEmail?: string;
  varEmailList?: string[];
}
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SitesComponent {
  @Input() clusterList: Cluster[]
  @ViewChild('sbuTable') table: Table; // Access the table component

  SBUList: any[] = []
  SitesList: any[] = []

  addedtiModal: AddEditModal = { AddSiteModal: false }
  emailModal: AddEditModal = { AddSiteModal: false }


  AddClusterModal: any = { add: false, edit: false }
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
  newEmail: string = ''

  clusterDataList: any[] = []
  SBUDataList: any[] = []
  NewModalDialog: boolean = false

  constructor(private masterService: MasterService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  cancel() {
    this.addedtiModal = { AddSiteModal: false, isEditing: false, siteCode: "", SiteName: "", siteID: 0 }

    // this.AddClusterModal = { add: false, edit: false }
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

        this.SitesList.forEach((site: any) => {
          if (site.varEmail) {
            site.varEmailList = site.varEmail.trim().split(';').filter((item: any) => item !== "")
          } else {
            site.varEmailList = [];
          }
        });
        console.log(this.SitesList)
        // this.SitesList = siteData.RefInfor;
      }

    });
  }

  toggleAddNewModal() {
    console.log(this.NewModalDialog)
    // this.NewModalDialog = !this.NewModalDialog
    this.addedtiModal = { AddSiteModal: !this.addedtiModal.AddSiteModal, isEditing: false, siteCode: "", SiteName: "", siteID: 0, numSiteID: 0 }
  }
  toggleemailModal(singleSite: Site) {
    this.emailModal = {
      AddSiteModal: !this.emailModal.AddSiteModal,
      isEditing: true,
      siteCode: singleSite.varSiteCode,
      varEmail: singleSite.varEmail || "",
      varEmailList: singleSite.varEmailList
    }

  }

  onRemoveChip(email: string) {
    this.emailModal = { ...this.emailModal, varEmailList: (this.emailModal.varEmailList ?? []).filter(item => item !== email) }
  }


  deleteSBU(singleSite: Site) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete Site: ${singleSite.varSiteName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.DeleteSite({ varSBUCode: singleSite.varSBUCode, varSiteCode: singleSite.varSiteCode }).subscribe(RefInfor => {
          if (RefInfor.RefInfor === "Success") {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site  Deleted!', life: 3000 });
            this.LoadSItesList()
          } else if (RefInfor.RefInfor === "Fail") {
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'Site Not Found!', life: 3000 });
          }
        })
      }
    });
  }
  editSIte(singleSIte: Site) {
    this.addedtiModal = { AddSiteModal: !this.addedtiModal.AddSiteModal, isEditing: true, siteCode: singleSIte.varSiteCode, SiteName: singleSIte.varSiteName, siteID: 0, numSiteID: singleSIte.numSiteID }

  }

  addEditSite(siteData: NgForm) {
    if (siteData.invalid) {
      Object.keys(siteData.controls).forEach(field => {
        const control = siteData.controls[field];
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      });
      return;
    }
  }

  addEmailToLst() {
    if (this.newEmail === "") {
      this.messageService.add({ severity: 'error', summary: 'email required', detail: 'Please enter an email address', life: 3000 });
      return;
    }
    if(this.emailModal.varEmailList?.includes(this.newEmail)){
      this.messageService.add({ severity: 'error', summary: 'Duplicate email', detail: 'Cannot enter duplicate emails', life: 3000 });
      return;
    }

    this.emailModal.varEmailList?.push(this.newEmail)
    this.newEmail = ""
  }

  UpdateEmailListAction() {
    this.masterService.UpdateSiteEmailList({
      varSiteCode: this.emailModal.siteCode,
      varEmail: this.emailModal.varEmailList?.join(';'),
    }).subscribe(sbuData => {
      if (sbuData.RefInfor === "Success") {
        this.LoadSItesList()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site ' + sbuData.RefInfor + "!", life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: sbuData.RefInfor + "!", life: 3000 });
      }
    });
  }
}
