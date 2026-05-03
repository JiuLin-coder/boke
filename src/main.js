import { createApp } from "vue";
import app from "./index.vue";
import { router } from "./utils/router.js";

const App = createApp(app);

App.use(router);

App.mount("#app");
