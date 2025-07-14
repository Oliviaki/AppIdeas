import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
export interface ItemData {
  id: number | string;
  [key: string]: any;
}

interface VisibleItem {
  id: number | string;
  index: number;
  top: number;
  data: ItemData;
}

interface ItemSize {
  height: number;
  top: number;
  bottom: number;
}

interface Props {
  className?: string;
  items: ItemData[];
  estimatedItemSize?: number;
  buffer?: number;
  children: (item: ItemData, index: number) => React.ReactNode;
  onScroll?: (scrollInfo: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
  }) => void;
}

const EstimatedVirtualList: React.FC<Props> = ({
  className,
  items,
  estimatedItemSize = 50,
  buffer = 2000,
  children,
  onScroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // 存储每个元素的高度和位置信息
  const [itemSizes, setItemSizes] = useState<{
    [key: string | number]: ItemSize;
  }>({});
  // 存储可见区域内的元素
  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);

  // 计算列表总高度
  const totalHeight =
    items.length === 0
      ? 0
      : (() => {
          const lastItem = items[items.length - 1];
          const size = itemSizes[lastItem.id] || {
            bottom: estimatedItemSize * items.length,
          };
          return size.bottom;
        })();

  // 计算可见区域的元素
  const calculateVisibleItems = () => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight } = containerRef.current;
    const start = scrollTop - buffer;
    const end = scrollTop + clientHeight + buffer;

    let visibleStart = 0;
    let visibleEnd = items.length - 1;

    // 找到可见区域的起始和结束索引
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const size = itemSizes[item.id] || {
        top: i * estimatedItemSize,
        bottom: (i + 1) * estimatedItemSize,
      };

      if (size.bottom >= start) {
        visibleStart = i;
        break;
      }
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const size = itemSizes[item.id] || {
        top: i * estimatedItemSize,
        bottom: (i + 1) * estimatedItemSize,
      };

      if (size.top <= end) {
        visibleEnd = i;
        break;
      }
    }

    // 更新可见元素列表
    const newVisibleItems = [];
    for (let i = visibleStart; i <= visibleEnd; i++) {
      const item = items[i];
      const size = itemSizes[item.id] || {
        top: i * estimatedItemSize,
        height: estimatedItemSize,
      };

      newVisibleItems.push({
        id: item.id,
        index: i,
        top: size.top,
        data: item,
      });
    }

    setVisibleItems(newVisibleItems);

    onScroll?.({
      scrollTop,
      scrollHeight: totalHeight,
      clientHeight,
    });
  };

  // 处理滚动事件
  const handleScroll = () => {
    calculateVisibleItems();
  };

  // 测量元素高度并更新缓存
  const measureItems = () => {
    if (!viewportRef.current) return;

    const children = viewportRef.current.children;
    let hasNewMeasurements = false;
    let newItemSizes = { ...itemSizes };

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const index = visibleItems[i]?.index;

      if (index !== undefined) {
        const item = items[index];
        const height = child.offsetHeight;

        // 如果高度变化或尚未测量，更新尺寸信息
        if (!newItemSizes[item.id] || newItemSizes[item.id].height !== height) {
          // 计算当前元素的顶部位置
          const prevItem = index > 0 ? items[index - 1] : null;
          const prevBottom = prevItem
            ? newItemSizes[prevItem.id]?.bottom || index * estimatedItemSize
            : 0;

          newItemSizes[item.id] = {
            height,
            top: prevBottom,
            bottom: prevBottom + height,
          };

          // 更新后续元素的位置
          for (let j = index + 1; j < items.length; j++) {
            const nextItem = items[j];
            const prevItem = items[j - 1];
            const prevBottom =
              newItemSizes[prevItem.id]?.bottom || j * estimatedItemSize;

            if (newItemSizes[nextItem.id]) {
              const height = newItemSizes[nextItem.id].height;
              newItemSizes[nextItem.id] = {
                ...newItemSizes[nextItem.id],
                top: prevBottom,
                bottom: prevBottom + height,
              };
            } else {
              break; // 如果遇到未测量的元素，停止更新
            }
          }

          hasNewMeasurements = true;
        }
      }
    }

    // 如果有新的测量结果，更新尺寸信息并重新计算可见元素
    if (hasNewMeasurements) {
      setItemSizes(newItemSizes);
      calculateVisibleItems();
    }
  };

  // 初始化和监听变化
  useEffect(() => {
    calculateVisibleItems();

    // 使用MutationObserver监听内容变化
    let observer: MutationObserver | null = null;

    if (viewportRef.current) {
      observer = new MutationObserver(() => {
        measureItems();
      });

      observer.observe(viewportRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    // 初始测量
    setTimeout(() => {
      measureItems();
    }, 0);

    return () => {
      observer?.disconnect();
    };
  }, []);

  // 监听items变化
  useEffect(() => {
    // 重置尺寸缓存
    const newIds = new Set(items.map((item) => item.id));
    const updatedItemSizes = { ...itemSizes };

    Object.keys(updatedItemSizes).forEach((key) => {
      if (!newIds.has(key)) {
        delete updatedItemSizes[key];
      }
    });

    setItemSizes(updatedItemSizes);
    calculateVisibleItems();

    // 测量新元素
    setTimeout(() => {
      measureItems();
    }, 0);
  }, [items]);

  return (
    <div
      className={`virtual-list-container ${className}`}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div
        className="virtual-list-placeholder"
        style={{ height: `${totalHeight}px` }}
      ></div>
      <div className="virtual-list-viewport" ref={viewportRef}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="virtual-list-item"
            style={{
              transform: `translateY(${item.top}px)`,
            }}
          >
            {children(item.data, item.index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimatedVirtualList;
