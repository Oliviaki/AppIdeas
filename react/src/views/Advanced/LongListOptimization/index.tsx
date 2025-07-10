import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./index.scss";
import RecycleScroller from "./EqualHeight/RecycleScroller";
import ListItem from "./ListItem";
interface LongListOptimizationProps {
  children?: ReactNode;
}
const LongListOptimization: FC<LongListOptimizationProps> = () => {
  const dataSource = new Array(100000).fill(0).map((_, index) => ({
    id: index,
    name: `Item ${index}`,
    count: index,
  }));
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
      </div>
    </div>
  );
};
export default memo(LongListOptimization);
