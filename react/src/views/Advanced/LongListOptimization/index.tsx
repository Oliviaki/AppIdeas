import { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import type { ItemData } from "./UnequalHeight";
import "./index.scss";
import RecycleScroller from "./EqualHeight/RecycleScroller";
import UnequalHeight from "./UnequalHeight";
import ListItem from "./ListItem";
import "@/http/mock";
interface LongListOptimizationProps {
  children?: ReactNode;
}
const LongListOptimization: FC<LongListOptimizationProps> = () => {
  const [listData, setListData] = useState<ItemData[]>([]);
  const dataSource = new Array(100000).fill(0).map((_, index) => ({
    id: index,
    name: `Item ${index}`,
    count: index,
  }));
  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((res) => {
        setListData(res.data.list);
      });
  }, []);
  return (
    <div className="long-list-optimization-container">
      <div className="item-equal-height">
        <h1>等高</h1>
        <RecycleScroller
          className="scroll"
          dataSource={dataSource}
          itemHeight={54}
          prev={10}
          next={10}
          itemGap={10}
          renderItem={(item) => <ListItem itemData={item} />}
        />
      </div>
      <div className="item-unequal-height">
        <h1>不等高</h1>
        <UnequalHeight items={listData} className="scroll">
          {(item) => (
            <div>
              id:{item.id};{item.content}
            </div>
          )}
        </UnequalHeight>
      </div>
    </div>
  );
};
export default memo(LongListOptimization);
