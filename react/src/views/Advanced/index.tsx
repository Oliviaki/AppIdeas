import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Description from "@/components/Description";
import type { DataType } from "@/components/Description";
import "./index.scss";
interface AdvancedProps {
  children?: ReactNode;
}
const Advanced: FC<AdvancedProps> = () => {
  const tableData: DataType[] = [
    {
      name: "LongListOptimization",
      description: "虚拟列表(等高/不等高)",
      key: "LongListOptimization",
    },
  ];
  return (
    <div className="advanced-container">
      <Description data={tableData} PositionData={{ bottom: 10, right: 10 }} />
      <Outlet />
    </div>
  );
};
export default memo(Advanced);
