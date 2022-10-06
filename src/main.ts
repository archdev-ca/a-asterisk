import App from "./app";
import PubSub from "./pubsub";
import { Node } from "./models";
import { config } from "./config";
import { ClickAction } from "./constants";
import "./styles/app.css";

// Elements
const map = document.getElementById("map");
const nextBtn = document.getElementById("btn-next") as HTMLButtonElement;
const playBtn = document.getElementById("play");
const instruction = document.getElementById("instruction");
const stepper = document.getElementById("stepper");
const steps = stepper?.getElementsByClassName("step");
const stepLines = stepper?.getElementsByClassName("stepper-line");

// Initialize stuff
const pubsub = new PubSub();
const app = new App(config.mapSize, config.mapSize, pubsub);
nextBtn?.addEventListener("click", function () {
  return app.handleClickNext();
});
playBtn?.addEventListener("click", function () {
  app.solve();
});
pubsub.subscribe("onClickNext", function () {
  if (steps && stepLines) {
    for (let i = 0; i < steps?.length; i++) {
      if (app.clickAction >= i) {
        steps[i].classList.add("active");
      }
      if (app.clickAction > i) {
        stepLines[i].classList.add("active");
      }
    }
  }
  if (app.clickAction === ClickAction.SET_START) {
    instruction.innerHTML = "Click on a box to set a starting point";
  }
  if (app.clickAction === ClickAction.SET_END) {
    instruction.innerHTML = "Click on a box to set an end point";
  }
  if (app.clickAction === ClickAction.SET_OBSTACLE) {
    instruction.innerHTML = "Click on the boxes to create obstacles";
  }
  updateNextButtonState();
});
pubsub.subscribe("onSetStartNode", function () {
  let startNode = app.getStartNode();
});
pubsub.subscribe("onNodeClick", function () {
  updateNextButtonState();
});
instruction.innerHTML = "Click on a box to set a starting point";

function updateNextButtonState() {
  if (app.clickAction === ClickAction.SET_START) {
    if (!app.startNodeId) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }
  if (app.clickAction === ClickAction.SET_END) {
    if (!app.endNodeId) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }
}

// Generate Map
for (let x = 0; x < config.mapSize; x++) {
  for (let y = 0; y < config.mapSize; y++) {
    let cell = document.createElement("div");
    cell.className = "cell";

    // create node element
    let nodeEl = document.createElement("div");
    nodeEl.className = "node";
    cell.appendChild(nodeEl);

    // create node object
    let node = new Node(x, y, "", nodeEl);
    nodeEl.addEventListener("click", function () {
      return app.handleClickNode(x, y);
    });

    // store node
    app.addNode(x, y, node);

    map?.appendChild(cell);
  }
}
