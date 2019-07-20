import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';


export interface IGraph {
  links: Edge[];
  nodes: Node[];
}
