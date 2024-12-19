import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cluster } from 'src/app/models/cluster';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class ClusterComponent implements OnInit {
  @Input() clusterList: Cluster[]

  AddClusterModal: any = { add: false, edit: false }
  cols: any[]
  clusterName: string
  varClusterCode: string;
  addModelValues: Cluster = {
    varGroupCode: "",
    varClusterCode: "",
    varClusterName: "",
    bitActive: true
  }
  clusterDataList: any []

  constructor(private confirmationService: ConfirmationService, private messageService:MessageService) { }

  cancel() {
    this.AddClusterModal = { add: false, edit: false }
  }

  ngOnInit() {
    this.cols = [
      { field: 'numClusterID', header: 'Cluster ID' },
      { field: 'varClusterCode', header: 'Cluster Code' },
      { field: 'varClusterName', header: 'Cluster Name' },
      { field: 'varGroupCode', header: 'Group Code' },
    ];

    
  }

  onClusterChange(){}

  deleteSBU(singleCluster: Cluster) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete Cluster: ${singleCluster.varClusterName} ?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cluster Deleted', life: 3000 });
      }
    });
  }
}
