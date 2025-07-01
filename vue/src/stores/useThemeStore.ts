import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
type Theme = "light" | "dark";
const THEME_KEY = "__THEME__";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>(
    (localStorage.getItem(THEME_KEY) as Theme) || "light"
  );
  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
    localStorage.setItem(THEME_KEY, theme.value);
  });
  return { theme };
});
