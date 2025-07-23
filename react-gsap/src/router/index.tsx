import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Canvas_Crop from "@/views/Canvas_Crop";
import Stagger_Object from "@/views/Stagger_Object";
import CssPlugin_Text_Shadow from "@/views/CssPlugin_Text_Shadow";
import ModifiersPlugin_Part_1 from "@/views/ModifiersPlugin_Part_1";
import EndArrayPlugin from "@/views/EndArrayPlugin";
import ExpoScaleEase from "@/views/ExpoScaleEase";
import TextPlugin from "@/views/Text_Plugin";
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
  {
    path: "modifiers-plugin-part-1",
    element: <ModifiersPlugin_Part_1></ModifiersPlugin_Part_1>,
  },
  {
    path: "end-array-plugin",
    element: <EndArrayPlugin></EndArrayPlugin>,
  },
  {
    path: "expo-scale-ease",
    element: <ExpoScaleEase></ExpoScaleEase>,
  },
  {
    path: "text-plugin",
    element: <TextPlugin></TextPlugin>,
  },
];
function RouterView() {
  return useRoutes(routes);
}
export default RouterView;
