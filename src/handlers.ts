declare global {
  interface Window {
    clickAction: string;
  }
}

export function handleNodeClick() {
  switch (window.clickAction) {
    default:
      console.log(window.clickAction);
      break;
  }
}
