import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGraph } from '../models/graph';
import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  localStorageKey: string = 'localTribe';

  graphData$: BehaviorSubject<IGraph> = new BehaviorSubject(null);

  rootNode: Node = {
    id: '1',
    label: 'SELF'
  };


  constructor() { }


  initGraphData(): void {
    const localGraph: IGraph = JSON.parse(window.localStorage.getItem(this.localStorageKey));
    if (localGraph) {
      this.graphData$ = new BehaviorSubject(localGraph);
    } else {
      this.graphData$ = new BehaviorSubject({
        nodes: [this.rootNode],
        links: []
      });
    }
  }


  modifyGraph(nodeData: { nodeLabel: string, nodeParent: Node}) {
    const snapshot: IGraph = this.graphData$.value;
    const newId: number = Math.max.apply(Math, snapshot.nodes.map( el =>  parseInt(el.id) )) + 1;
    const newNode: Node = {
      id: newId.toString(),
      label: nodeData.nodeLabel
    };
    const newEdge: Edge = {
      source: nodeData.nodeParent.id,
      target: newId.toString()
    };
    this.graphData$.next(
      {
        nodes: [...snapshot.nodes, newNode],
        links: [...snapshot.links, newEdge]
      }
    );
    this.saveGraph();
  }


  saveGraph() {
     window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.graphData$.value));
  }


  clearGraph() {
    window.localStorage.removeItem(this.localStorageKey);
    window.location.reload();
  }

}
