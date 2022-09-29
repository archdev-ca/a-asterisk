import { NodeType } from "./types";

export class Node {
  x: number;
  y: number;
  actor: HTMLDivElement;
  type: string;
  open: boolean;
  close: boolean;
  gCost: number;
  fCost: number;
  hCost: number;
  parentNode: NodeType;

  constructor(x, y, type, actor) {
    this.x = x;
    this.y = y;
    this.actor = actor;
    this.type = type;
    this.open = true;
    this.close = false;
    this.gCost = 0;
    this.fCost = 0;
    this.hCost = 0;
  }
}
