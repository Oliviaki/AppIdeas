import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./ListItem.scss";
interface ListItemProps {
  children?: ReactNode;
  itemData: {
    id: number;
    name: string;
    count: number;
  };
}
const ListItem: FC<ListItemProps> = (props) => {
  return (
    <div className="list-item-container">
      <div className="list-item-id">id:{props.itemData.id}</div>
      <div className="list-item-name">name:{props.itemData.name}</div>
      <div className="list-item-count">count:{props.itemData.count}</div>
    </div>
  );
};
export default memo(ListItem);
