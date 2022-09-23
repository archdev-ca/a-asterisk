export type Cell = {
  x: number;
  y: number;
};

export type NodeType = {
  x: number;
  y: number;
  type: string;
  el: HTMLDivElement;
};

export type NodeStoreType = {
  byId: { [key: string]: NodeType };
  allIds: string[];
};
