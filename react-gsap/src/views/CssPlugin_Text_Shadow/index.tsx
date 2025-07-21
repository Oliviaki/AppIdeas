import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import "./index.scss";
import Gsap from "gsap";
interface CssPlugin_Text_ShadowProps {
  children?: ReactNode;
}
const CssPlugin_Text_Shadow: FC<CssPlugin_Text_ShadowProps> = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = e;
    Gsap.set(".text", {
      textShadow: `${
        (clientX - containerRef.current!.clientWidth / 2) / 60
      }px ${
        (clientY - containerRef.current!.clientHeight / 2) / 60
      }px 2px #fff,${
        (clientX - containerRef.current!.clientWidth / 2) / 50
      }px ${
        (clientY - containerRef.current!.clientHeight / 2) / 50
      }px 30px yellow`,
    });
  }

  return (
    <div
      className="cssPlugin_Text_Shadow-container"
      onMouseMove={handleMove}
      ref={containerRef}
    >
      <p className="text">MeiLiMao</p>
    </div>
  );
};
export default memo(CssPlugin_Text_Shadow);
