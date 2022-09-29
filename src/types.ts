export type Cell = {
  x: number;
  y: number;
};

export type NodeType = {
  x: number;
  y: number;
  open: boolean;
  close: boolean;
  type: string;
  actor: HTMLDivElement;
  gCost: number;
  fCost: number;
  hCost: number;
  parentNode: NodeType;
};

export type NodeStoreType = {
  byId: { [key: string]: NodeType };
  allIds: string[];
};

export type BooleanMapType = {
  [key: string]: boolean;
};

export type QueueType = {
  nodes: Array<NodeType>;
  map: { [key: string]: boolean };
};
