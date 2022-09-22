import { NodeType } from "./types";
import { Node } from "./models";
import { config } from "./config";
import { ClickAction } from "./constants";
import { handleNodeClick } from "./handlers";
import "./styles/app.css";

globalThis.clickAction = ClickAction.SET_START;

// Elements
const map = document.getElementById("map");

// Data Storage
const nodeStore = {
 byId: {},
 allIds: [],
};

// Generate Map
for (let x = 0; x < config.mapSize; x++) {
 for (let y = 0; y < config.mapSize; y++) {
  let cell = document.createElement("div");
  cell.className = "cell";

  // create node element
  let nodeEl = document.createElement("div");
  nodeEl.className = "node";
  nodeEl.addEventListener("click", handleNodeClick);

  // create node object
  let node = new Node(x, y, "", nodeEl);
  node.el = nodeEl;
  node.x = x;
  node.y = y;
  node.type = "";

  // store node
  let newId = `${x}:${y}`;
  nodeStore.byId[newId] = node;
  node.allIds.push(newId);

  map.appendChild(cell);
 }
}

/**
 * Set Starting Node
 */

function getSurroundingNodes() {}

function findPath() {}

function tracebackNode() {}

// 1. Push starting node to queue

// 2. Get latest from queue

// 3. Get surrounding nodes

// 4. Get GCost, HCost, and FCost of each node

// 5. Queue lowest Fcost and mark it as closed
//    If multiple FCost, get the one with the lowest HCost

// 6. Pull item from queue

// 7. Repeat 3 - 6
