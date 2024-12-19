import { Component } from '@angular/core';
import { Cluster } from 'src/app/models/cluster';
import { LUser } from 'src/app/models/LUser';
import { SBU } from 'src/app/models/sbu';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-organizationstructure',
  templateUrl: './organizationstructure.component.html',
  styleUrls: ['./organizationstructure.component.css'],
  providers: [MasterService]
})
export class OrganizationstructureComponent {
  items: any[];
  activeItem: string = "";
  clusterList: Cluster[];
  SBUList: SBU[];

  clusterCode: string

  constructor(private masterService: MasterService) { }


  ngOnInit() {
    this.items = [
      { label: 'Router Link', icon: 'pi pi-home', route: '/tabmenu' },
      {
        label: 'Programmatic',
        icon: 'pi pi-palette',
        command: () => {

        }
      },
      { label: 'External', icon: 'pi pi-link', url: 'https://angular.io/' }
    ];

    const user = <LUser>JSON.parse(localStorage.getItem('currentUser') || "");
console.log(user)
    this.LoadClusterList(user.varUserCode);
  }

  LoadClusterList(varUserCode: string) {
    this.masterService.GetClusterListByUser(varUserCode).subscribe(clusterData => {

      if (clusterData.RefInfor.length > 0) {
        this.clusterList = clusterData.RefInfor;
        this.clusterCode = this.clusterList[0].varClusterCode
      }
      console.log(this.clusterList)

    });
  }
}
