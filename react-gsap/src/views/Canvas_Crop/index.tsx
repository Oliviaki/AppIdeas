import { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import "./index.scss";
import Gsap from "gsap";
import codeImage from "./code.png";
interface Canvas_CropProps {
  children?: ReactNode;
}
const Canvas_Crop: FC<Canvas_CropProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  function loadCanvas(canvasId: number) {
    if (!containerRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.id = `canvas${canvasId}`;
    canvas.className = "canvas";
    canvas.width = 946;
    canvas.height = 28;
    containerRef.current.appendChild(canvas);
  }
  function loadImage(canvasId: number, sy: number) {
    const canvas = document.getElementById(
      `canvas${canvasId}`
    ) as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.onload = function () {
      const sx = 0;
      const sWidth = 946;
      const sHeight = 28;
      const dx = 0;
      const dy = 0;
      const dWidth = 946;
      const dHeight = 28;
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
    image.src = codeImage;
  }
  function drawImage() {
    for (let i = 0; i < 27; i++) {
      loadCanvas(i);
      loadImage(i, i * 28);
    }
  }
  let skip = 1,
    increment = 2,
    angleY = 0,
    angleZ = 0;
  function handleMove() {
    if (skip % 5 === 0) {
      if (angleY < 89) {
        if (angleY % 90 === 0) {
          increment = increment * -1;
        }
      }
      Gsap.to(".canvas", {
        rotationY: angleY,
        rotationZ: angleZ,
        duration: 2,
        stagger: 0.1,
      });
      skip++;
      angleY = angleY - 5 * Math.abs(increment);
      angleZ = angleZ + increment;
    }
    skip++;
  }
  useEffect(() => {
    drawImage();
  }, []);
  return (
    <div
      className="canvas_crop-container"
      ref={containerRef}
      onMouseMove={handleMove}
    ></div>
  );
};
export default memo(Canvas_Crop);
