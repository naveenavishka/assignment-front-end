import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { jobTypes } from 'src/app/data/master-data';
import { Cluster } from 'src/app/models/cluster';
import { FilterConfig } from 'src/app/models/filter-config';
import { LUser } from 'src/app/models/LUser';
import { SBU } from 'src/app/models/sbu';
import { ConfData } from 'src/app/models/shared/conf-data';
import { Site } from 'src/app/models/site';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-safety-walk-dashboard',
  templateUrl: './safety-walk-dashboard.component.html',
  styleUrls: ['./safety-walk-dashboard.component.css'],
  providers: [DashboardService, MasterService]
})
export class SafetyWalkDashboardComponent {
  @ViewChild("safetyWalkTable") safetyWalkTable: Table;
  @Input() clusterList: Cluster[];
  @Input() sbuList: SBU[];
  @Input() siteList: Site[];

  clusterDataList: any[];
  sbuDataList: any[];
  siteDataList: any[];
  cols: any[];
  SafetyWalkDT: any[] = [];
  SafetyWalkImgDT: any[] = [];

  filterDT: FilterConfig;
  user: LUser;

  jobTypes = jobTypes;

  varClusterCode: string;
  varSBUCode: string;
  varSiteCode: string;
  jobType: string;
  imageModalTitle: string;

  currentPage: number
  rowsPerPage = 9; // Number of rows per page
  lastPage = false;

  loading: boolean = false

  showImageModal = false;

  constructor(private dashboardService: DashboardService, private masterService: MasterService, public confData: ConfData) {
    this.filterDT = new FilterConfig();
  }

  ngOnInit() {

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
      { field: 'varObserverdEmployeeName', header: 'Observed Employee' },
      { field: 'numNoofYearsADV', header: 'Years at ADV' },
      { field: 'varObservedJob', header: 'Observed Job' },
      { field: 'varSpecialObservation', header: 'Special Observation' },
      { field: 'varIsRoutine', header: 'Routine' },
      { field: 'varQ1Status', header: 'Take a while to check work environment before start working?' },
      { field: 'varQ2Status', header: 'Act safely when conducting the task?' },
      { field: 'varQ3Status', header: 'Have an understanding and is aware of the emergency rules of the site?' },
      { field: 'varQ4Status', header: 'Keep his/her work area clean & tidy?' },
      { field: 'varQ5Status', header: 'Identify the hazards in the site and take them into account?' },
      { field: 'varQ6Status', header: 'Notice & report any near misses or unexpected situations' },
      { field: 'varQ7Status', header: 'Have the tools well packed and in good condition, ready to be used?' },
      { field: 'varQ8Status', header: 'Use relevant and proper tools for the job' },
      { field: 'varQ9Status', header: 'Have the PPEs in good condition, ready to be used?' },
      { field: 'varQ10Status', header: 'Wear/uses the PPE properly' },
      { field: 'dteCreateOn', header: 'Reported On' },
      { field: 'varCreateBy', header: 'Reported By' }
    ];

    this.GetIncDetails();
  }

  GetIncDetails() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = 'All';

    this.dashboardService.GetSafetyWalkDetails(this.filterDT).subscribe(data => {
      this.SafetyWalkDT = data.RefInfor;
    });
  }

  onCloseActivity(numIncID: number) {

  }

  updateCurrentPage(): void {
    this.safetyWalkTable.first = 0
  }

  onViewImages(varCategoryTypeDes: string, numIncID: number) {

    this.imageModalTitle = varCategoryTypeDes;

    this.dashboardService.GetSafetyWalkImages(numIncID).subscribe(data => {

      this.SafetyWalkImgDT = data.RefInfor;
      this.showImageModal = true;
    });

  }

  onSearchByDate() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = 'FilterByDate';

    this.dashboardService.GetSafetyWalkDetails(this.filterDT).subscribe(data => {
      this.SafetyWalkDT = data.RefInfor;
    });
  }

  onClearSearch() {
    this.filterDT.dteFromDate = null;
    this.filterDT.dteToDate = null;
    this.GetIncDetails();
  }

  onClusterChange() {

    this.masterService.GetSBUListByUser(this.user.varUserCode, this.varClusterCode).subscribe(sbuData => {
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
      this.siteList = siteData.RefInfor;

      this.siteDataList = this.siteList.map(m => {
        return {
          label: m.varSiteName,
          value: m.varSiteCode
        };
      });
    });
  }


  onSiteChange() {
    const varSiteName = this.siteList.find(f => f.varSiteCode === this.varSiteCode)?.varSiteName || "";

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = varSiteName;
    this.filterDT.varEvent = 'FilterByStr';

    this.dashboardService.GetSafetyWalkDetails(this.filterDT).subscribe(data => {
      this.SafetyWalkDT = data.RefInfor;
    });
  }

  fetchData(filterby: string) {
    this.loading = true
    if (filterby === "") { return }

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = filterby;
    this.filterDT.varEvent = 'FilterByStr';

    this.dashboardService.GetSafetyWalkDetails(this.filterDT).subscribe(data => {
      this.SafetyWalkDT = [...this.SafetyWalkDT, ...data.RefInfor]
      this.loading = false

    });
  }

  onPageChange(event: any) {
    const newpage = Math.round(event.first / 10)
    if (this.currentPage > newpage || this.SafetyWalkDT.length > event.first + 9) { return }

    this.currentPage = newpage;
    this.filterDT.numPageValue = this.currentPage * 10;

    let searchString = ''
    if (this.varSBUCode !== "" && this.varSBUCode !== undefined) {
      const varSBUName = this.sbuList.find(f => f.varSBUCode === this.varSBUCode)?.varSBUName || "";
      searchString = varSBUName
    }
    if (this.varSiteCode !== "" && this.varSiteCode !== undefined) {
      const varSiteName = this.siteList.find(f => f.varSiteCode === this.varSiteCode)?.varSiteName || "";
      searchString = varSiteName
    }
    this.fetchData(searchString)
  }

}
