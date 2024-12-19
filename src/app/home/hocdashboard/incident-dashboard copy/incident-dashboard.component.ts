import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { FilterConfig } from 'src/app/models/filter-config';
import { SBU } from 'src/app/models/sbu';
import { ConfData } from 'src/app/models/shared/conf-data';
import { Site } from 'src/app/models/site';

import { MasterService } from 'src/app/services/master.service';
import { ConfirmationService } from 'primeng/api';
import { IncidentCloseDT } from 'src/app/models/incident-close-dt';
import { Paginator } from 'primeng/paginator';
import { Cluster } from 'src/app/models/cluster';
import { DashboardService } from 'src/app/services/dashboard.service';
import { jobTypes } from 'src/app/data/master-data';
import { LUser } from 'src/app/models/LUser';


@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css'],
  providers: [DashboardService, MasterService, ConfirmationService, ConfData]
})
export class IncidentDashboardComponent {

  @ViewChild('paginator') paginator: Paginator;
  @Input() clusterList: Cluster[];
  @Input() sbuList: SBU[];
  @Input() siteList: Site[];

  clusterDataList: any[];
  sbuDataList: any[];
  siteDataList: any[];
  cols: any[];
  HeadUsersTableCols: any[];
  IncidentDT: any[] = [];
  IncidentImgDT: any[] = [];
  AllHeadUsers: any[] = [];
  selectedHeadUserCode: string;
  selectedIncidentId: number;

  filterDT: FilterConfig;
  incidentCloseDT: IncidentCloseDT;
  user: LUser;

  jobTypes = jobTypes;

  varClusterCode: string;
  varSBUCode: string;
  varSiteCode: string;
  jobType: string;
  imageModalTitle: string;
  varActionComment: string;
  varActionType: Boolean;

  showImageModal = false;
  showAssignUsersModal = false;
  showCloseModal = false;

  // data: any[] = []; // Your data model
  page = 3
  totalRecords: Number; // Total number of records
  rowsPerPage = 10; // Number of rows per page
  currentPage = 0; // Current page

  constructor(private dashboardService: DashboardService, private masterService: MasterService,
    private confirmationService: ConfirmationService, public confData: ConfData) {
    this.filterDT = new FilterConfig();
  }

  ngOnInit() {

    this.incidentCloseDT = new IncidentCloseDT();

    this.user = <LUser>JSON.parse(localStorage.getItem('currentUser') || "");

    this.varClusterCode = this.clusterList[0].varClusterCode;

    this.clusterDataList = this.clusterList.map(m => {
      return {
        label: m.varClusterName,
        value: m.varClusterCode
      };
    });

    this.sbuDataList = this.sbuList.map(m => {
      return {
        label: m.varSBUName,
        value: m.varSBUCode
      };
    });

    this.siteDataList = this.siteList.map(m => {
      return {
        label: m.varSiteName,
        value: m.varSiteCode
      };
    });

    this.cols = [
      { field: 'varSBUName', header: 'SBU' },
      { field: 'varSiteName', header: 'Site' },
      { field: 'varCategoryName', header: 'Category' },
      { field: 'varCategoryTypeDes', header: 'Category Type' },
      { field: 'varRiskStatus', header: 'Risk Level' },
      { field: 'varIncDes', header: 'Incident Desc' },
      { field: 'dteIncDate', header: 'Reported On' },
      { field: 'varCreateBy', header: 'Reported By' },
      { field: 'varAssignedTo', header: 'Assigned To' },
      { field: 'varActionComment', header: 'Comment' },
      { field: 'bitClose', header: 'Status' },
    ];

    this.HeadUsersTableCols = [
      { field: 'varUserName', header: 'User' },
      { field: 'varUserCode', header: 'User Code' },
      { field: 'varUserRole', header: 'Role' }
    ]

    // this.GetIncDetails();

  }

  updateCurrentPage(): void {
    setTimeout(() => this.paginator.changePage(0));
  }
  GetIncDetails() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = 'All';
    this.filterDT.numPageValue = this.currentPage * 10;


    this.dashboardService.GetRowCount(this.filterDT).subscribe(data => {
      this.totalRecords = data.RefInfor
    });

    this.dashboardService.GetIncDetails(this.filterDT).subscribe(data => {
      this.IncidentDT = data.RefInfor;
    });
    this.updateCurrentPage();
  }

  onCloseActivity(numIncID: number) {

    this.incidentCloseDT = new IncidentCloseDT();

    this.incidentCloseDT.numIncID = numIncID;
    this.incidentCloseDT.varUserCode = this.user.varUserCode;
    this.showCloseModal = true;
  }

  onSubmitCloseIncident() {
    this.incidentCloseDT.varActionComment = this.varActionComment;
    this.incidentCloseDT.varActionType = this.varActionType ? "COMPLETE":"Comment"


    this.dashboardService.CloseIncident(this.incidentCloseDT).subscribe(data => {

      if (data.RefInfor == 'Successful') {

        // this.toastr.success('Incident closed successfully!', 'Close Incident');
        this.GetIncDetails();
        this.incidentCloseDT = new IncidentCloseDT();
        this.showCloseModal = false;
      }
      else {
        // this.toastr.error('Unable to close incident!', 'Close Incident');
      }

    });
  }

  onViewImages(varCategoryTypeDes: string, numIncID: number) {

    this.imageModalTitle = varCategoryTypeDes;

    this.dashboardService.GetIncImages(numIncID).subscribe(data => {

      this.IncidentImgDT = data.RefInfor;
      this.showImageModal = true;
    });

  }

  onAssignUsersBtnClick(numIncID: number) {

    this.selectedIncidentId = numIncID

    this.masterService.GetAllHeadUsers().subscribe(data => {
      this.AllHeadUsers = data.RefInfor;
      this.showAssignUsersModal = true;
    });

  }

  onSearchByDate() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = 'all';
    this.filterDT.numPageValue = this.currentPage * 10;

    this.dashboardService.GetRowCount(this.filterDT).subscribe(data => {
      this.totalRecords = data.RefInfor
    });

    this.dashboardService.GetIncDetails(this.filterDT).subscribe(data => {
      this.IncidentDT = data.RefInfor;
    });
    this.updateCurrentPage();
  }

  onClearSearch() {
    this.filterDT.dteFromDate = null;
    this.filterDT.dteToDate = null;
    this.GetIncDetails();
  }

  onClusterChange() {

    this.masterService.GetSBUListByUser(this.user.varUserCode, this.varClusterCode).subscribe(sbuData => {

      this.varSBUCode = '';

      this.sbuList = sbuData.RefInfor;

      this.sbuDataList = this.sbuList.map(m => {
        return {
          label: m.varSBUName,
          value: m.varSBUCode
        };
      });
    });

  }

  onSBUChange() {
    this.masterService.GetSiteListByUser(this.user.varUserCode, this.varSBUCode).subscribe(siteData => {

      this.varSiteCode = '';

      this.siteList = siteData.RefInfor;

      this.siteDataList = this.siteList.map(m => {
        return {
          label: m.varSiteName,
          value: m.varSiteCode
        };
      });
    });
  }

  onJobTypeChanged() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = this.jobType;
    this.filterDT.numPageValue = this.currentPage * 10;

    this.dashboardService.GetRowCount(this.filterDT).subscribe(data => {
      this.totalRecords = data.RefInfor
    });

    this.dashboardService.GetIncDetails(this.filterDT).subscribe(data => {
      this.IncidentDT = data.RefInfor;
    });
    this.updateCurrentPage();
  }

  onSiteChange() {

    const varSiteName = this.siteList.find(f => f.varSiteCode === this.varSiteCode)?.varSiteName || "";

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = varSiteName;
    this.filterDT.varEvent = 'FilterByStr';
    this.filterDT.numPageValue = this.currentPage * 10;

    this.dashboardService.GetIncDetails(this.filterDT).subscribe(data => {
      this.IncidentDT = data.RefInfor;
    });
    this.updateCurrentPage();

  }

  onUserRadioButtonSelected(headUsersCode: string) {
    this.selectedHeadUserCode = headUsersCode;
  }

  onAssignUsers() {
    this.dashboardService.AssignHeadUsersToIncident(this.selectedIncidentId, this.selectedHeadUserCode).subscribe(res => {
      // this.toastr.success('User assigned to incident successfully!', 'Assign User');
      this.GetIncDetails();
      this.showAssignUsersModal = false;
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.filterDT.numPageValue = this.currentPage * 10;

    this.dashboardService.GetIncDetails(this.filterDT).subscribe(data => {
      this.IncidentDT = data.RefInfor;
    });
  }
}
