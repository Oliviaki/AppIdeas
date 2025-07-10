import { memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import "./RecycleScroller.scss";
interface RecycleScrollerProps {
  children?: ReactNode;
  className?: string;
  dataSource?: any[];
  itemHeight?: number;
  itemGap?: number;
  keyField?: string;
  prev?: number;
  next?: number;
  renderItem: (item: any) => ReactNode;
}
const RecycleScroller: FC<RecycleScrollerProps> = (props) => {
  const defaultProps = Object.assign(
    {
      className: "",
      dataSource: [],
      itemHeight: 0,
      itemGap: 0,
      keyField: "id",
      prev: 0,
      next: 0,
    },
    props
  );
  const [pool, setPool] = useState<any[]>([]);
  const recycleScrollerContainerRef = useRef<HTMLDivElement>(null);
  function handleSetPool() {
    const { dataSource, itemHeight, itemGap, prev, next } = defaultProps;

    const itemSize = itemHeight + itemGap;

    const scrollTop = recycleScrollerContainerRef.current?.scrollTop || 0;

    const containerHeight =
      recycleScrollerContainerRef.current?.clientHeight || 0;

    const startIndex = Math.max(Math.floor(scrollTop / itemSize) - prev, 0);

    const endIndex = Math.ceil((scrollTop + containerHeight) / itemSize) + next;

    const startPosition = startIndex * itemSize;

    const pool = dataSource
      .slice(startIndex, endIndex)
      .map((item: any, index: number) => {
        return {
          item,
          position: index * itemSize + startPosition,
        };
      });
    setPool(pool);
  }

  const warpHeight =
    defaultProps.itemHeight * defaultProps.dataSource.length +
    defaultProps.itemGap * (defaultProps.dataSource.length - 1);

  useEffect(() => {
    handleSetPool();
  }, []);

  return (
    <div
      className={`recycle-scroller-container ${defaultProps.className}`}
      ref={recycleScrollerContainerRef}
      onScroll={handleSetPool}
    >
      <div className="recycle-scroller-warp" style={{ height: warpHeight }}>
        {pool.map((poolItem) => {
          return (
            <div
              className="recycle-scroller-item"
              style={{ transform: `translateY(${poolItem.position}px)` }}
              key={poolItem.item[defaultProps.keyField]}
            >
              {defaultProps.renderItem(poolItem.item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(RecycleScroller);
