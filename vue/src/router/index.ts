import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "introduction",
      component: () => import("@/views/Introduction/index.vue"),
      meta: {
        title: "Introduction",
      },
    },
    {
      path: "/beginner",
      name: "beginner",
      component: () => import("@/views/Beginner/index.vue"),
      meta: {
        title: "Beginner",
      },
      children: [
        {
          path: "bin2Dec",
          name: "bin2Dec",
          component: () => import("@/views/Beginner/Bin2Dec/index.vue"),
          meta: {
            title: "Bin2Dec",
          },
        },
        {
          path: "border-radius-previewer",
          name: "border-radius-previewer",
          component: () =>
            import("@/views/Beginner/Border-radius-Previewer/index.vue"),
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
      meta: {
        title: "Intermediate",
        isChildren: false,
      },
      children: [
        {
          path: "book-Finder-App",
          name: "book-Finder-App",
          component: () =>
            import("@/views/Intermediate/Book-Finder-App/index.vue"),
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
      meta: {
        title: "Advanced",
      },
    },
  ],
});

export default router;
