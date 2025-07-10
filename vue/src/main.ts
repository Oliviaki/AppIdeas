import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@/assets/css/reset.scss";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/theme.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/fontIcon.css";
import "quill/dist/quill.snow.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);


app.mount("#app");
