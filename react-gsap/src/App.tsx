import { memo } from "react";
import type { FC, ReactNode } from "react";
import RouterView, { routes } from "./router";
import { NavLink } from "react-router-dom";
import Gasp from "gsap";
import { useGSAP } from "@gsap/react";
import "./App.scss";
interface AppProps {
  children?: ReactNode;
}
const App: FC<AppProps> = () => {
  function handleClick(isExpand: boolean) {
    if (isExpand) {
      Gasp.to(".app-container .link", {
        duration: 1,
        ease: "bounce.out",
        xPercent: 100,
      });
    } else {
      Gasp.to(".app-container .link", {
        duration: 1,
        ease: "bounce.out",
        xPercent: 0,
      });
    }
  }
  return (
    <div className="app-container">
      <RouterView></RouterView>
      <div className="link">
        {routes.map((item) => (
          <NavLink key={item.path} to={item.path!}>
            {item.path}
          </NavLink>
        ))}
        <div
          className="right-arrow"
          onClick={() => {
            handleClick(true);
          }}
        >
          折叠
        </div>
        <div
          className="left-arrow"
          onClick={() => {
            handleClick(false);
          }}
        >
          展开
        </div>
      </div>
    </div>
  );
};
export default memo(App);
