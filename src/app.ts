import { NodeType } from "./types";
import { Node } from "./models";
import { config } from "./config";
import "./styles/app.css";

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

 function getSurroundingNodes() {}

 function findPath() {}

 function tracebackNode() {}
}
