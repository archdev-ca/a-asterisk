import { NodeStoreType, NodeType, QueueType, BooleanMapType } from "./types";
import { IPubSub } from "./pubsub";
import { ClickAction } from "./constants";
import Pathfinder from "./pathfinder";

export default class App {
  clickAction: number;
  store: NodeStoreType;
  startNodeId: string;
  endNodeId: string;
  pubsub: IPubSub;
  debug: boolean;
  obstacles: BooleanMapType;
  processQueue: QueueType;
  width: number;
  height: number;

  constructor(width, height, pubsub) {
    this.pubsub = pubsub;
    this.clickAction = ClickAction.SET_START;
    this.store = {
      byId: {},
      allIds: [],
    };
    this.debug = true;
    this.obstacles = {};
    this.processQueue = {
      nodes: [],
      map: {},
    };
    this.width = width;
    this.height = height;
  }

  /**
   * Set the starting node
   * @param x
   * @param y
   */
  setStartNode(x, y) {
    let id = `${x}:${y}`;
    this.store.allIds.forEach((id) => {
      this.store.byId[id].actor.innerHTML = "";
    });
    if (this.startNodeId == id) {
      this.startNodeId = "";
    } else {
      this.startNodeId = id;
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
    }
    this.pubsub.publish("onSetStartNode");
  }

  /**
   * Set the ending node
   * @param x
   * @param y
   */
  setEndNode(x, y) {
    let id = `${x}:${y}`;
    let lastEndNode = this.store.byId[this.endNodeId];
    if (lastEndNode) {
      lastEndNode.actor.classList.remove("end-node");
      lastEndNode.actor.innerHTML = "";
    }
    if (this.endNodeId == id) {
      this.endNodeId = "";
    } else {
      this.endNodeId = id;
      let endNode = this.store.byId[id];
      endNode.actor.classList.add("end-node");
      endNode.actor.innerHTML = "<span></span><span></span>";
    }
    this.pubsub.publish("onSetEndNode");
  }

  /**
   * Add obstacles
   * @param x
   * @param y
   */
  setObstacleNode(x, y) {
    if (this.debug) console.log(`-----setObstacleNode(${x},${y})`);
    let id = `${x}:${y}`;
    let node = this.store.byId[id];
    if (node.type === "obstacle") {
      node.actor.classList.remove("obstacle-node");
      node.type = "";
      delete this.obstacles[id];
    } else {
      node.actor.classList.add("obstacle-node");
      node.type = "obstacle;";
      this.obstacles[id] = true;
    }
    this.pubsub.publish("onSetObstacleNode");
  }

  /**
   * Go to next step
   */
  handleClickNext() {
    switch (this.clickAction) {
      case ClickAction.SET_START:
        this.clickAction = ClickAction.SET_END;
        break;
      case ClickAction.SET_END:
        // queue start node before moving to the next step
        let startNode = this.store.byId[this.startNodeId];
        this.queueNode(startNode);
        this.clickAction = ClickAction.SET_OBSTACLE;
        break;
      case ClickAction.SET_OBSTACLE:
        break;
    }
    this.pubsub.publish("onClickNext");
  }

  /**
   * What to do when a node is clicked
   * @param x
   * @param y
   */
  handleClickNode(x, y) {
    switch (this.clickAction) {
      case ClickAction.SET_START:
        this.setStartNode(x, y);
        break;
      case ClickAction.SET_END:
        this.setEndNode(x, y);
        break;
      case ClickAction.SET_OBSTACLE:
        this.setObstacleNode(x, y);
        break;
    }
    this.pubsub.publish("onNodeClick");
  }

  /**
   * Add new node
   * @param x
   * @param y
   * @param node
   */
  addNode(x, y, node) {
    let newId = `${x}:${y}`;
    this.store.byId[newId] = node;
    this.store.allIds.push(newId);
  }

  /**
   * Get the starting node
   * @returns
   */
  getStartNode() {
    return this.store.byId[this.startNodeId];
  }

  /**
   * Check if coordinate is valid
   * @param x
   * @param y
   * @returns
   */
  isValidCoords(x, y) {
    let id = `${x}:${y}`;
    let node = this.store.byId[id];
    if (
      // Inside the grid
      x > -1 &&
      x < this.width &&
      y > -1 &&
      y < this.height &&
      // Node is not closed
      !node.close &&
      // Not an obstacle node
      !this.obstacles[id] &&
      // Not start or end node
      id != this.startNodeId
    ) {
      return true;
    }
    return false;
  }

  /**
   * Get the distance between two coords
   * @param node1
   * @param node2
   * @returns
   */
  getDistance(node1, node2) {
    return (Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y)) * 10;
  }

  /**
   * Get nodes surrounding the coordinates
   * @param x
   * @param y
   */
  getSurroundingNodes(x, y) {
    let id = `${x}:${y}`;
    let parentNode = this.store.byId[id];
    let surroundingNodes = [] as NodeType[];
    let endNode = this.store.byId[this.endNodeId];
    let nodeCoords = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ];

    nodeCoords.forEach((coord) => {
      let [x, y] = coord;
      let newId = `${x}:${y}`;
      if (this.isValidCoords(x, y)) {
        let node = this.store.byId[newId];
        let gCost = parentNode.gCost + 10;
        let hCost = this.getDistance(node, endNode);
        let fCost = gCost + hCost;
        node.parentNode = parentNode;
        if (
          !this.processQueue.map[newId] ||
          fCost < node.fCost ||
          (fCost == node.fCost && hCost < node.hCost)
        ) {
          node.fCost = fCost;
          node.gCost = gCost;
          node.hCost = hCost;
          if (this.debug && newId !== this.endNodeId) {
            node.actor.innerHTML = `
              <p>gCost: ${gCost}</p>
              <p>hCost: ${hCost}</p>
              <p>gCost: ${gCost}</p>
            `;
          }
          if (newId !== this.endNodeId) {
            node.actor.classList.add("open-node");
          }
          surroundingNodes.push(node);
          this.queueNode(node);
        }
      }
    });
    return surroundingNodes;
  }

  traceback(node) {
    if (`${node.x}:${node.y}` === this.startNodeId) {
      return;
    }
    if (`${node.x}:${node.y}` !== this.endNodeId) {
      node.actor.classList.add("traced");
    }
    if (node.parentNode) {
      setTimeout(() => {
        this.traceback(node.parentNode);
      }, 50);
    }
    return;
  }

  queueNode(node) {
    if (node.close) {
      return false;
    }
    for (let i = 0; i < this.processQueue.nodes.length; i++) {
      let curNode = this.processQueue.nodes[i];

      // Lower fCost or Lower gCost
      if (
        node.fCost < curNode.fCost ||
        (node.fCost == curNode.fCost && node.hCost < curNode.hCost)
      ) {
        this.processQueue.nodes.splice(i, 0, node);
        this.processQueue.nodes.map[`${node.x}:${node.y}`] = true;
        return;
      }
    }
    this.processQueue.nodes.push(node);
    this.processQueue.nodes.map[`${node.x}:${node.y}`] = true;
  }

  solve() {
    // Get first item from queue
    let node = this.processQueue.nodes.shift();
    delete this.processQueue.nodes.map[this.startNodeId];

    // Exit if there is no array from queue
    if (!node) {
      return;
    }

    node.close = true;
    // If node === endNode, exit
    if (`${node?.x}:${node?.y}` === this.endNodeId) {
      // Trace node
      this.traceback(node);
      return;
    }

    // Get surrounding nodes and queue them
    let surroundingNodes = this.getSurroundingNodes(node?.x, node?.y);
    for (let i = 0; i < surroundingNodes.length; i++) {
      this.queueNode(surroundingNodes[i]);
    }
    this.solve();
  }
}
