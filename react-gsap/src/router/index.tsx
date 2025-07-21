import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Canvas_Crop from "@/views/Canvas_Crop";
import Stagger_Object from "@/views/Stagger_Object";
import CssPlugin_Text_Shadow from "@/views/CssPlugin_Text_Shadow";
export const routes: RouteObject[] = [
  {
    path: "/Canvas_Crop",
    element: <Canvas_Crop></Canvas_Crop>,
  },
  {
    path: "/Stagger_Object",
    element: <Stagger_Object></Stagger_Object>,
  },
  {
    path: "css_plugin_text_shadow",
    element: <CssPlugin_Text_Shadow></CssPlugin_Text_Shadow>,
  },
];
function RouterView() {
  return useRoutes(routes);
}
export default RouterView;
