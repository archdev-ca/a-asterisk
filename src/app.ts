import { NodeStoreType } from "./types";
import { IPubSub } from "./pubsub";
import { ClickAction } from "./constants";

export default class App {
  clickAction: string;
  store: NodeStoreType;
  startNodeId: string;
  endNodeId: string;
  pubsub: IPubSub;
  debug: boolean;

  constructor(pubsub) {
    this.pubsub = pubsub;
    this.clickAction = ClickAction.SET_START;
    this.store = {
      byId: {},
      allIds: [],
    };
    this.debug = true;
  }

  setStartNode(x, y) {
    let id = `${x}:${y}`;
    if (this.startNodeId == id) {
      this.startNodeId = "";
    } else {
      this.startNodeId = id;
    }
    this.store.allIds.forEach((id) => {
      this.store.byId[id].actor.innerHTML = "";
    });
    let startNode = this.getStartNode();
    startNode.actor.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0
          00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563
          0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563
          0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0
          00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563
          0 00.475-.345L11.48 3.5z"
        />
      </svg>
    `;
    this.pubsub.publish("onSetStartNode");
  }

  handleClickNext() {
    switch (this.clickAction) {
      case ClickAction.SET_START:
        this.clickAction = ClickAction.SET_END;
        break;
      case ClickAction.SET_END:
        this.clickAction = ClickAction.SET_OBSTACLE;
        break;
      case ClickAction.SET_OBSTACLE:
        break;
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

  getStartNode() {
    return this.store.byId[this.startNodeId];
  }
}
