import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { World } from "./World/World.js";

const main = () => {
  const container = document.querySelector("#scene-container");
  const world = new World(container);
  world.start();
}

main();

createApp(App).use(router).mount("#app");
