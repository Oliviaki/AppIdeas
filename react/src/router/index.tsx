import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

export type CustomRouteObject = RouteObject & {
  meta?: {
    title: string;
  };
  children?: CustomRouteObject[];
};

const Introduction = lazy(() => import("@/views/Introduction"));
const Beginner = lazy(() => import("@/views/Beginner"));
const Intermediate = lazy(() => import("@/views/Intermediate"));
const Advanced = lazy(() => import("@/views/Advanced"));

const Bin2Dec = lazy(() => import("@/views/Beginner/Bin2Dec"));
const BorderRadiusPreviewer = lazy(
  () => import("@/views/Beginner/BorderRadiusPreviewer")
);
export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <Introduction />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/beginner",
    element: <Beginner></Beginner>,
    meta: {
      title: "初级",
    },
    children: [
      {
        path: "",
        element: <Navigate to="/beginner/bin2dec" replace />,
      },
      {
        path: "bin2dec",
        element: <Bin2Dec />,
        meta: {
          title: "Bin2Dec",
        },
      },
      {
        path: "border-radius-breviewer",
        element: <BorderRadiusPreviewer />,
        meta: {
          title: "BorderRadiusPreviewer",
        },
      },
    ],
  },
  {
    path: "/intermediate",
    element: <Intermediate></Intermediate>,
    meta: {
      title: "中级",
    },
  },
  {
    path: "/advanced",
    element: <Advanced></Advanced>,
    meta: {
      title: "高级",
    },
  },
];

function RouterView() {
  return (
    <Suspense fallback={<Spin fullscreen tip="Loading..." />}>
      {useRoutes(routes)}
    </Suspense>
  );
}

export default RouterView;
