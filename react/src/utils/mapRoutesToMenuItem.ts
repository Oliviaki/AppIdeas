import { type CustomRouteObject } from "@/router";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

export function mapRoutesToMenuItem(
  routes: CustomRouteObject[],
  parentRoute: string = ""
): MenuItem[] {
  return routes
    .map((item) => {
      if (!Object.getOwnPropertyNames(item).includes("children")) {
        return {
          key: parentRoute ? `${parentRoute}/${item.path}` : item.path,
          label: item.meta?.title,
        } as MenuItem;
      }
      return {
        key: item.path,
        label: item.meta?.title,
        children: mapRoutesToMenuItem(item.children!, item.path),
      } as MenuItem;
    })
    .filter((item) => (item as any).label);
}
