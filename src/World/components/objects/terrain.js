import {
  PlaneBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
} from "three";

export default function createTerrain(props) {
  const loader = new TextureLoader();
  const height = loader.load("textures/height.png");
  //                                        w    h
  const geometry = new PlaneBufferGeometry(150, 150, 64, 64);

  const material = new MeshStandardMaterial({
    color: props.color,
    flatShading: true,
    displacementMap: height,
    displacementScale: 5,
  });

  const plane = new Mesh(geometry, material);
  plane.position.set(0, 0, 0);
  plane.rotation.x -= Math.PI * 0.5;

  plane.geometry.attributes.position.originalPosition =
    plane.geometry.attributes.position.array;

  const { array } = plane.geometry.attributes.position;
  for (let i = 0; i < array.length; i++) {
    props.randVertexArr.push(Math.random());
  }

  plane.geometry.attributes.position.randomValues = props.randVertexArr;

  let frame = 0;
  plane.tick = (delta) => {
    frame += 0.01;
    const { array, originalPosition, randomValues } =
      plane.geometry.attributes.position;

    for (let i = 0; i < array.length; i += 3) {
      array[i + 2] =
        originalPosition[i + 2] + Math.cos(frame + randomValues[i + 2]) * 0.002;
    }
    plane.geometry.attributes.position.needsUpdate = true;
  };

  return plane;
}
