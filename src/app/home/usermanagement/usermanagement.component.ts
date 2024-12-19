import { Component, SimpleChanges } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cluster } from 'src/app/models/cluster';
import { LUser } from 'src/app/models/LUser';
import { SBU } from 'src/app/models/sbu';
import { UserMgFilter } from 'src/app/models/shared/UserMgFilter';
import { Site } from 'src/app/models/site';
import { MasterService } from 'src/app/services/master.service';
import { UserService } from 'src/app/services/user.service';
import { RoleUtil } from 'src/app/utilservices/role';

class UserProcedureParams {
  visible?: boolean;
  varUserName?: string;
  varUserCode?: string;
  varEmail?: string;
  varDfltSBUCode?: string;
  varDfltSiteCode?: string;
  varCreatedBy?: string;
}
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  providers: [UserService, RoleUtil]
})



export class UsermanagementComponent {

  clusterDataList: any[]
  sbuDataList: any[]
  siteDataList: any[]


  clusterList: Cluster[]
  sbuList: SBU[]
  siteList: Site[]


  userActiveStatusList: any[] = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Pending Approval', value: 'pending' }
  ]

  userLevels: any[] = [
    { label: 'All', value: '' },
    { label: 'Ohs officer', value: 'bitSiteOHSOfficer' },
    { label: 'Site Head', value: 'bitSiteHead' },
    { label: 'OHS Officer', value: 'bitSBUOHSOfficer' },
    { label: 'Line manager', value: 'bitLineManager' },
    { label: 'SBU head', value: 'bitSBUHead' },
    { label: 'GMC Member', value: 'bitGMCMember' },
    { label: 'Cluster Head', value: 'bitClusterHead' },
    { label: 'Group OHS Officer', value: 'bitGroupOHSOfficer' },

  ]

  varClusterCode: string
  varSBUCode: string
  varSiteCode: string

  varUserStatus: string;
  user: any
  UserMGList: any[] = [];
  cols: any[]
  varUserLevel: string

  userMgFilter: UserMgFilter

  userCreateModal: UserProcedureParams = { visible: false }


  constructor(private userService: UserService, private masterService: MasterService, private roleservices: RoleUtil, private messageService:MessageService) {
    this.userMgFilter = new UserMgFilter()
  }

  ngOnInit() {


    this.user = <LUser>JSON.parse(localStorage.getItem('currentUser') || "");
    this.varUserStatus = "All"

    this.cols = [
      //varUserName, varUserCode, varDfltGroupCode, varDfltSBUCode, varDfltSiteCode, varEmail, bitActive, dteCreateOn,
      { field: 'varUserCode', header: 'varUserCode' },
      { field: 'varUserName', header: 'varUserName' },
      { field: 'varSBUName', header: 'SBU' },
      { field: 'varSiteName', header: 'Site' },
      // { field: 'bitActive', header: 'Status' },
      { field: 'dteCreateOn', header: 'Created On' },
      { field: 'varUserRole', header: 'User role' },
    ];
    this.LoadClusterList(this.user.varUserCode)

    this.getUserList()

  }

  LoadClusterList(varUserCode: string) {
    this.masterService.GetClusterListByUser(varUserCode).subscribe(clusterData => {
      if (clusterData.RefInfor.length > 0) {
        this.clusterList = clusterData.RefInfor;
        this.clusterDataList = clusterData.RefInfor.map((e: any) => {
          return {
            value: e.varClusterCode,
            label: e.varClusterName
          }
        })
        this.masterService.GetSBUListByUser(varUserCode, this.clusterList[0].varClusterCode).subscribe(sbuData => {

          if (sbuData.RefInfor.length > 0) {
            this.sbuList = sbuData.RefInfor;
            this.sbuDataList = sbuData.RefInfor.map((e: any) => {
              return {
                value: e.varSBUCode,
                label: e.varSBUName
              }
            })
            this.masterService.GetSiteListByUser(varUserCode, this.sbuList[0].varSBUCode).subscribe(siteData => {
              if (siteData.RefInfor.length > 0) {
                this.siteList = siteData.RefInfor;
                this.siteDataList = siteData.RefInfor.map((e: any) => {
                  return {
                    value: e.varSiteCode,
                    label: e.varSiteName
                  }
                })
              }
            });
          }
        });
      }

    });
  }
  LoadSItesList() {
    this.masterService.GetSiteListByUser("admin", this.varSBUCode).subscribe(siteData => {
      if (siteData.RefInfor.length > 0) {
        this.siteDataList = siteData.RefInfor.map((m: any) => {
          return {
            label: m.varSiteName,
            value: m.varSiteCode
          };
        });
      }
    });
  }
  getUserList() {
    this.userMgFilter.varUserCode = this.user.varUserCode;
    this.userMgFilter.varUserStatus = this.varUserStatus;
    this.userMgFilter.varClusterCode = this.varClusterCode
    this.userMgFilter.varSBUCode = this.varSBUCode
    this.userMgFilter.varSIteCode = this.varSiteCode

    this.userService.GetUserList(this.userMgFilter).subscribe(data => {
      this.UserMGList = data.RefInfor
      this.UserMGList.forEach(item => {
        item.severity = this.roleservices.getSeverity(item.varUserRole)
      })
    })
  }

  onUserStatusChange() {
    this.getUserList()
  }
  toggleCreationModal() {
    this.userCreateModal.varDfltSiteCode = this.siteList.find(item => item.varSiteCode = this.varSiteCode)?.varSiteName || ""
    this.userCreateModal.visible = !this.userCreateModal.visible
  }

  applyStatusFilter(selectedStatus: string) {
    if (selectedStatus === "active") {
      return this.UserMGList.filter(item => item.bitActive === true)
    } else if (selectedStatus === "pending") {
      return this.UserMGList.filter(item => item.bitActive === false)
    }
    return ""
  }

  createUserAction(userData: NgForm) {
    if (userData.invalid) {
      Object.keys(userData.controls).forEach(field => {
        const control = userData.controls[field];
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      });
      return;
    }
    if(!this.varSiteCode){
      this.messageService.add({ severity: 'error', summary: 'Default SBU & Site codes require!', detail: 'Please select sbu and site!', life: 3000 })

      return
    }
    this.userCreateModal.varDfltSiteCode = this.varSiteCode
    this.userCreateModal.varDfltSBUCode = this.varSBUCode
    this.userService.createUser(this.userCreateModal).subscribe(data => {
      if(data.RefInfor ==="user_id_taken"){
        this.messageService.add({ severity: 'error', summary: 'User Code Taken', detail: 'User Code is already taken. please try something else!', life: 3000 })
      }else if(data.RefInfor ==="user_created"){
        this.getUserList()
        this.messageService.add({ severity: 'success', summary: 'User Created!', detail: 'User Created Successfully! Please reset the password using the email address', life: 3000 })
      }
    })

  }

}
