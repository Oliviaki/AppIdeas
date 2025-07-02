import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "introduction",
      component: () => import("@/views/Introduction/index.vue"),
    },
    {
      path: "/beginner",
      name: "beginner",
      component: () => import("@/views/Beginner/index.vue"),
      children: [
        {
          path: "1-Bin2Dec",
          name: "1-Bin2Dec",
          component: () => import("@/views/Beginner/1-Bin2Dec/index.vue"),
          meta: {
            title: "Bin2Dec",
          },
        },
        {
          path: "2-Border-radius-Previewer",
          name: "2-Border-radius-Previewer",
          component: () =>
            import("@/views/Beginner/2-Border-radius-Previewer/index.vue"),
          meta: {
            title: "Border-radius-Previewer",
          },
        },
      ],
    },
    {
      path: "/intermediate",
      name: "intermediate",
      component: () => import("@/views/Intermediate/index.vue"),
      children: [
        {
          path: "1-Book-Finder-App",
          name: "1-Book-Finder-App",
          component: () =>
            import("@/views/Intermediate/1_Book_Finder_App/index.vue"),
          meta: {
            title: "Book-Finder-App",
          },
        },
      ],
    },
    {
      path: "/advanced",
      name: "advanced",
      component: () => import("@/views/Advanced/index.vue"),
    },
  ],
});

export default router;
