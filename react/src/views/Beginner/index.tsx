import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
interface BeginnerProps {
  children?: ReactNode;
}
const Beginner: FC<BeginnerProps> = () => {
  return (
    <div>
      Beginner
      <Outlet />
    </div>
  );
};
export default memo(Beginner);
