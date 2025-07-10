import { memo } from "react";
import type { FC, ReactNode } from "react";
import type { DataType } from "@/components/Description";
import { Outlet } from "react-router-dom";
import Description from "@/components/Description";
import "./index.scss";
interface BeginnerProps {
  children?: ReactNode;
}
const Beginner: FC<BeginnerProps> = () => {
  const tableData: DataType[] = [
    {
      name: "Bin2Dec",
      description: "二进制转十进制",
      key: "Bin2Dec",
    },
    {
      name: "BorderRadiusPreviewer",
      description: "边框圆角预览",
      key: "BorderRadiusPreviewer",
    },
  ];
  return (
    <div className="beginner-container">
      <Description data={tableData} PositionData={{ bottom: 10, right: 10 }} />
      <Outlet />
    </div>
  );
};
export default memo(Beginner);
