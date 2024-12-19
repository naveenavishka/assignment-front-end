import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-suggestion-dashboard',
  templateUrl: './suggestion-dashboard.component.html',
  styleUrls: ['./suggestion-dashboard.component.css'],
  providers: [DashboardService, MasterService]
})
export class SuggestionDashboardComponent {

  @Input() clusterList: Cluster[];
  @Input() sbuList: SBU[];
  @Input() siteList: Site[];

  clusterDataList: any[];
  sbuDataList: any[];
  siteDataList: any[];
  SuggestionActDT: any[] = [];
  SuggestionImgDT: any[] = [];
  cols: any[];

  filterDT: FilterConfig;
  user: LUser;

  jobTypes = jobTypes;

  varClusterCode: string = "";
  varSBUCode: string;
  varSiteCode: string;
  jobType: string;

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
      //{ field: 'varGroupName', header: 'Group' },
      { field: 'varSBUName', header: 'SBU' },
      { field: 'varSiteName', header: 'Site' },
      { field: 'varSuggestionDes', header: 'Suggestion' },
      { field: 'dteSgDate', header: 'Suggestion Raised On' },
      { field: 'varActionType', header: 'Action Type' },
      { field: 'varActionComment', header: 'Action Comment' }
    ];

    this.jobType = 'All';

    // this.GetSuggestionDetails();
  }

  GetSuggestionDetails() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = 'All';

    this.dashboardService.GetSuggestionDetails(this.filterDT).subscribe(data => {
      this.SuggestionActDT = data.RefInfor;
    });
  }

  onViewSuggestionImages(numSuggestionID: number) {

    this.dashboardService.GetSuggestionImages(numSuggestionID).subscribe(data => {

      this.SuggestionImgDT = data.RefInfor;
      this.showImageModal = true;
    });

  }

  onSearchByDate() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = this.jobType === 'All' ? 'FilterByDateAll' : this.jobType === 'Opened' ? 'FilterByDateOpened' : 'FilterByDateClosed';

    this.dashboardService.GetSuggestionDetails(this.filterDT).subscribe(data => {
      this.SuggestionActDT = data.RefInfor;
    });
  }

  onClearSearch() {
    this.GetSuggestionDetails();
  }

  onJobTypeChanged() {

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = '';
    this.filterDT.varEvent = this.jobType || "";

    this.dashboardService.GetSuggestionDetails(this.filterDT).subscribe(data => {
      this.SuggestionActDT = data.RefInfor;
    });
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
    this.onSBUChangefetch()
  }

  onSiteChange() {
    this.loading = true

    const varSiteName = this.siteList.find(f => f.varSiteCode === this.varSiteCode)?.varSiteName || "";

    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = varSiteName;
    this.filterDT.varEvent = this.filterDT.varEvent = this.jobType === 'All' ? 'FilterByStrAll' : this.jobType === 'Opened' ? 'FilterByStrOpened' : 'FilterByStrClosed';

    this.dashboardService.GetSuggestionDetails(this.filterDT).subscribe(data => {
      this.SuggestionActDT = data.RefInfor;
      this.loading = false

    });

  }
  onSBUChangefetch() {
    this.loading = true
    const varSbuName = this.sbuList.find(f => f.varSBUCode === this.varSBUCode)?.varSBUName || "";
    console.log(varSbuName)
    this.filterDT.varUserCode = this.user.varUserCode;
    this.filterDT.varSearchStr = varSbuName;
    this.filterDT.varEvent = this.filterDT.varEvent = this.jobType === 'All' ? 'FilterByStrAll' : this.jobType === 'Opened' ? 'FilterByStrOpened' : 'FilterByStrClosed';

    this.dashboardService.GetSuggestionDetails(this.filterDT).subscribe(data => {
      this.SuggestionActDT = data.RefInfor;
      this.loading = false

    });

  }
}
