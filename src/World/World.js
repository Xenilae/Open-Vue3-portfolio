import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Loop } from "./systems/Loop.js";
import { Resizer } from "./systems/Resizer.js";
import { createControls } from "./systems/controls.js";

import createTerrain from "./components/objects/terrain.js";

let color = "#42b883";
let color2 = "#4eac82";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene(color2);
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);

    container.append(renderer.domElement);
    const controls = createControls(camera, renderer.domElement);

    const { light, lightHelper } = createLights(color);

    const randomVals = [];
    for (let i = 0; i < 12675; i++) {
      randomVals.push(Math.random() - 0.5);
    }

    let terrain = createTerrain({
      color: color,
      randVertexArr: randomVals,
    });

    loop.updatables.push(controls);
    loop.updatables.push(light);
    loop.updatables.push(terrain);

    scene.add(light, terrain);

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
