import { Node } from "./types";
import { config } from "./config";
import "./styles/app.css";

// Elements
const map = document.getElementById("map");

// Data Storage
const nodeStore = Array<Node>;

// Generate Map
for (let x = 0; x < config.mapSize; x++) {
 for (let y = 0; y < config.mapSize; y++) {
  let cell = document.createElement("div");
  cell.className = "cell";
  // cell.style.left = `${x * config.cellSize}px`;
  // cell.style.top = `${y * config.cellSize}px`;
  map.appendChild(cell);
 }
}
