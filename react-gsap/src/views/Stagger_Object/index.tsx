import { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import "./index.scss";
import backgroundBeach from "./background_Beach.png";
import backgroundJpg from "./background.jpg";
import backgroundPng from "./background.png";
import Gsap from "gsap";
interface StaggerObjectProps {
  children?: ReactNode;
}
const StaggerObject: FC<StaggerObjectProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let clickNumber = 0;
  function loadCanvas(canvasId: string, i: number, j: number) {
    const canvas = document.createElement("canvas");
    const containerWidth = containerRef.current?.clientWidth || 0;
    const containerHeight = containerRef.current?.clientHeight || 0;
    canvas.id = canvasId;
    canvas.width = 114;
    canvas.height = 76;
    canvas.className = "canvas";
    canvas.style.left = `${i * containerWidth * 0.1}px`;
    canvas.style.top = `${j * containerHeight * 0.1}px`;
    containerRef.current?.appendChild(canvas);
  }

  function loadImage(canvasId: string, i: number, j: number) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.onload = function () {
      const sx = i,
        sy = j,
        sWidth = 114,
        sHeight = 76,
        dx = 0,
        dy = 0,
        dWidth = 114,
        dHeight = 76;
      context?.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
    };
    image.src = backgroundBeach;
  }
  function drawImage() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const canvasId = `canvas-col${i}-row${j}`;
        loadCanvas(canvasId, j, i);
        loadImage(canvasId, j * 114, i * 76);
      }
    }
  }

  function handleClick() {
    if (clickNumber === 0) {
      Gsap.to(".canvas", {
        duration: 2,
        rotateZ: 360,
        x: containerRef.current!.clientWidth,
        stagger: {
          each: 0.1,
          from: "start",
          grid: [10, 10],
          ease: "expo.out",
        },
      });
      clickNumber = 1;
    } else {
      Gsap.to(".canvas", {
        duration: 2,
        rotateZ: 0,
        x: 0,
        stagger: {
          each: 0.1,
          from: "end",
          grid: [10, 10],
          ease: "back.in(4)",
        },
      });
      clickNumber = 0;
    }
  }
  useEffect(() => {
    drawImage();
  }, []);
  return (
    <div
      className="stagger-object-container"
      ref={containerRef}
      onClick={handleClick}
    >
      <img src={backgroundJpg} alt="" />
      <img src={backgroundPng} alt="" />
    </div>
  );
};
export default memo(StaggerObject);
