import { Component, OnInit } from '@angular/core';
import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';
import { GraphService } from '../services/graph.service';
import { IGraph } from '../models/graph';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {


  graphData$: BehaviorSubject<IGraph>;

  nodeForm: FormGroup;

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.graphService.initGraphData();
    this.graphData$ = this.graphService.graphData$;
    this.nodeForm = new FormGroup({
      nodeLabel: new FormControl('', Validators.required),
      nodeParent: new FormControl('', Validators.required)
    });
    this.addGraphChangesActions();
  }

  addNode() {
    this.graphService.modifyGraph(this.nodeForm.value);
    this.nodeForm.reset();
  }

  addGraphChangesActions() {
    this.graphData$.subscribe( _ => {
      console.log(this.nodeForm);
    });
  }

  clearGraph() {
    this.nodeForm.reset();
    this.graphService.clearGraph();
  }


}
