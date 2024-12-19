import { Component } from '@angular/core';
import { Cluster } from 'src/app/models/cluster';
import { LUser } from 'src/app/models/LUser';
import { SBU } from 'src/app/models/sbu';
import { Site } from 'src/app/models/site';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-hocdashboard',
  templateUrl: './hocdashboard.component.html',
  styleUrls: ['./hocdashboard.component.css'],
  providers:[MasterService]
})
export class HocdashboardComponent {
  clusterList: Cluster [];
  sbuList: SBU [];
  siteList: Site [];

  constructor(private masterService: MasterService) {

    this.clusterList = new Array<Cluster>();
    this.sbuList = new Array<SBU>();
    this.siteList = new Array<Site>();
  }

  ngOnInit() {

    const user = <LUser>JSON.parse(localStorage.getItem('currentUser')||"");

    this.LoadClusterList(user.varUserCode);
  }

  LoadClusterList(varUserCode: string) {

    this.masterService.GetClusterListByUser(varUserCode).subscribe(clusterData => {
      if (clusterData.RefInfor.length > 0) {
        this.clusterList = clusterData.RefInfor;

        this.masterService.GetSBUListByUser(varUserCode, this.clusterList[0].varClusterCode).subscribe(sbuData => {
       
          if (sbuData.RefInfor.length > 0) {
            this.sbuList = sbuData.RefInfor;

            this.masterService.GetSiteListByUser(varUserCode, this.sbuList[0].varSBUCode).subscribe(siteData => {
              if (siteData.RefInfor.length > 0) {
                this.siteList = siteData.RefInfor;
              }
            });
          }
        });
      }

    });
  }
}
