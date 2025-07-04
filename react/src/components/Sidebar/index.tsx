import { memo, use, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { mapRoutesToMenuItem } from "@/utils/mapRoutesToMenuItem";
import { routes } from "@/router";
import { useLocation, useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
interface SidebarProps {
  children?: ReactNode;
}
const items: MenuItem[] = mapRoutesToMenuItem(routes);
const reg: RegExp = /(\/[^\/]*).*/;
const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultSelectedKeys = [location.pathname];
  const defaultOpenKeys = [location.pathname.replace(reg, "$1")];
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };
  return (
    <div className="sidebar-container">
      <Menu
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClick}
      />
    </div>
  );
};
export default memo(Sidebar);
