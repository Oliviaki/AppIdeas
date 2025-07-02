import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import "@/assets/css/reset.scss";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/theme.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useThemeStore } from "@/stores/useThemeStore";
import "@/assets/css/fontIcon.css";

const app = createApp(App);

app.use(createPinia());
useThemeStore(); //初始化主题
app.use(router);
app.use(ElementPlus);


app.mount("#app");
