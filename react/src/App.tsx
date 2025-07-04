import { memo } from "react";
import type { FC, ReactNode } from "react";
import RouterView from "./router";
import Sidebar from "./components/Sidebar";
import "./App.scss"
interface AppProps {
  children?: ReactNode;
}
const App: FC<AppProps> = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <RouterView />
      </div>
    </div>
  );
};
export default memo(App);
