import { memo } from "react";
import type { FC, ReactNode } from "react";
import RouterView, { routes } from "./router";
import { NavLink } from "react-router-dom";
import "./App.scss"
interface AppProps {
  children?: ReactNode;
}
const App: FC<AppProps> = () => {
  return (
    <div className="app-container">
      <RouterView></RouterView>
      <div className="link">
        {routes.map((item) => (
          <NavLink key={item.path} to={item.path!}>
            {item.path}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default memo(App);
