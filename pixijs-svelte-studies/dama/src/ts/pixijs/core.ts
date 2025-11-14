import { Application, Graphics } from "pixi.js";

const app = new Application();

export async function initPixiApplication(htmlElement: HTMLElement) {
  await app.init({
    width: htmlElement.clientWidth,
    height: htmlElement.clientHeight,
    resizeTo: htmlElement,
  });

  htmlElement.appendChild(app.canvas);

  console.log("Pixi carregado com sucesso");
}

// export function createBoard() {
//   let houses = [];
// }

export function drawBoard() {
  let tileWidth = app.canvas.width / 8;
  let tileHeight = app.canvas.height / 8;

  const g = new Graphics();

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const color = (x + y) % 2 === 0 ? "#333" : "555";

      g.rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight).fill({
        color,
      });

      app.stage.addChild(g);
    }
  }
}
