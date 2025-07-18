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
          path: "book-finder-app",
          name: "book-finder-app",
          component: () =>
            import("@/views/Intermediate/Book-Finder-App/index.vue"),
          meta: {
            title: "Book-Finder-App",
          },
        },
        {
          path: "rich-text-editor",
          name: "rich-text-editor",
          component: () =>
            import("@/views/Intermediate/Rich-Text-Editor-Quill/index.vue"),
          meta: {
            title: "Rich-Text-Editor",
          },
        },
        {
          path: "switch-theme",
          name: "switch-theme",
          component: () => import("@/views/Intermediate/SwitchTheme/index.vue"),
          meta: {
            title: "Switch-Theme",
          },
        },
        {
          path: "vue-draggable",
          name: "vue-draggable",
          component: () =>
            import("@/views/Intermediate/Vue-Draggable/index.vue"),
          meta: {
            title: "Vue-Draggable",
          },
        },
        {
          path: "gsap-site",
          name: "gsap-site",
          component: () => import("@/views/Intermediate/Gasp-Site/index.vue"),
          meta: {
            title: "Gsap-Site",
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
      children: [
        {
          path: "long-list-optimization",
          name: "long-list-optimization",
          component: () =>
            import("@/views/Advanced/LongListOptimization/index.vue"),
          meta: {
            title: "Long-List-Optimization",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  document.title = `梅狸猫-${to.meta.title as string}`;
});

export default router;
