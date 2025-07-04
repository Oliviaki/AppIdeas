import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Table, type TableProps } from "antd";
import "./index.scss";
export interface DataType {
  key: string;
  name: string;
  description: string;
}
interface DescriptionProps {
  children?: ReactNode;
  data: DataType[];
  PositionData: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}
const Description: FC<DescriptionProps> = (props) => {
  const defaultPosition = Object.assign(
    { top: "initial", bottom: "initial", left: "initial", right: "initial" },
    props.PositionData
  );
  return (
    <div className="description-container" style={defaultPosition}>
      <Table columns={columns} dataSource={props.data} pagination={false} />;
    </div>
  );
};
export default memo(Description);

const columns: TableProps<DataType>["columns"] = [
  {
    title: "项目名称",
    dataIndex: "name",
  },
  {
    title: "项目描述",
    dataIndex: "description",
  },
];
