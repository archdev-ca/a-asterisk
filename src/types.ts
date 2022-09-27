export type Cell = {
  x: number;
  y: number;
};

export type NodeType = {
  x: number;
  y: number;
  type: string;
  actor: HTMLDivElement;
};

export type NodeStoreType = {
  byId: { [key: string]: NodeType };
  allIds: string[];
};
