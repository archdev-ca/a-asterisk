import { NodeStoreType } from "./types";
import { ClickAction } from "./constants";

export default class App {
  clickAction: string;
  store: NodeStoreType;
  startNodeId: string;
  endNodeId: string;

  constructor() {
    this.clickAction = ClickAction.SET_START;
    this.store = {
      byId: {},
      allIds: [],
    };
  }

  setStartNode(x, y) {
    let id = `${x}:${y}`;
    if (this.startNodeId == id) {
      this.startNodeId = "";
    } else {
      this.startNodeId = id;
    }
  }

  handleClickNode(x, y) {
    switch (this.clickAction) {
      case ClickAction.SET_START:
        this.setStartNode(x, y);
        break;
      case ClickAction.SET_END:
        break;
      case ClickAction.SET_OBSTACLE:
        break;
    }
  }

  // Add node to store
  addNode(x, y, node) {
    let newId = `${x}:${y}`;
    this.store.byId[newId] = node;
    this.store.allIds.push(newId);
  }
}
