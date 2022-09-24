import { NodeStoreType } from "./types";
import { ClickAction } from "./constants";

export default class App {
  clickAction: string;
  store: NodeStoreType;
  startNodeId: string;
  endNodeId: string;

  constructor() {
    this.clickAction = ClickAction.SET_START;
  }

  // Add node to store
  addNode(x, y, node) {
    let newId = `${x}:${y}`;
    this.store.byId[newId] = node;
    this.store.allIds.push(newId);
  }
}
