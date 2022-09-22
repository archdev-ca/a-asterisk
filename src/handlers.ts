export function handleNodeClick() {
 declare global {
  let clickAction: string;
 }

 switch (clickAction) {
  default:
   console.log(clickAction);
   break;
 }
}
