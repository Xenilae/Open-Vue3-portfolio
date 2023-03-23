import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    35,
    1,
    0.1,
    100,
  );

  camera.position.set(0, 10, 30);
  camera.tick = (delta) => {
    
  };

  return camera;
}

export { createCamera };