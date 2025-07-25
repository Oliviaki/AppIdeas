import { memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import "./index.scss";
import { useGSAP } from "@gsap/react";
import Gs from "gsap";
import { cardsList } from "./config";
interface MyWishProps {
  children?: ReactNode;
}
const starArray = new Array(12).fill(0).map((_, index) => index + 1);
const MyWish: FC<MyWishProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonWishRef = useRef<HTMLDivElement>(null);
  const [isWish, setIsWish] = useState(false);
  function handleStarBlink() {
    // Gs.to(".star2,.star3,.star4,.star8,.star9,.star10,.star11,.star12", {
    //   scale: 0.5,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "none",
    //   stagger: {
    //     from:"random",
    //     each: 0.1,
    //   },
    // });
    // 选择所有星星元素
    const stars = Gs.utils.toArray(
      ".star2,.star3,.star4,.star8,.star9,.star10,.star11,.star12"
    ) as HTMLDivElement[];

    // 为每颗星星创建独特的闪烁动画
    stars.forEach((star) => {
      // 为每颗星星设置随机属性
      const duration = 1 + Math.random() * 2; // 闪烁持续时间 1-3秒
      const scaleMin = 0.3 + Math.random() * 0.4; // 最小缩放比例 0.3-0.7
      const opacityMin = 0.2 + Math.random() * 0.6; // 最小透明度 0.2-0.8

      // 使用贝塞尔曲线创建更自然的缓动效果
      const ease = Gs.parseEase("sine.inOut");

      Gs.to(star, {
        scale: scaleMin,
        opacity: opacityMin,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: ease,
        stagger: {
          from: "random",
          amount: 2, // 随机延迟0-2秒
        },
      });
    });
  }
  function animateBoat() {
    // 选择小船元素
    const boats = Gs.utils.toArray(
      ".star1,.star5,.star6,.star7"
    ) as HTMLDivElement[];

    // 设置随机参数，使动画更自然
    const randomRotate = 10 + Math.random() * 3; // 摇摆角度范围
    const randomFloat = 3 + Math.random() * 4; // 漂浮高度范围
    const randomDuration = 2 + Math.random() * 3; // 动画周期
    boats.forEach((boat) => {
      // 创建小船摇摆动画
      Gs.to(boat, {
        rotation: randomRotate,
        y: -randomFloat,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center bottom", // 以船底为中心摇摆
      });
    });
  }
  function handleClickCard(index: number) {
    if (isWish) {
      alert("只能许下一个愿望");
      return;
    }
    setIsWish(true);
    const tl = Gs.timeline();
    const containerWidth = containerRef.current!.clientWidth / 2;
    const containerHeight = containerRef.current!.clientHeight / 2;
    tl.to(`#card${index}`, {
      rotationY: 360,
      x: (_, target, __) => {
        const targetWidth = target.clientWidth / 2;
        const targetLeft = target.offsetLeft;
        return -targetLeft + containerWidth - targetWidth;
      },
      y: (_, target, __) => {
        const targetHeight = target.clientHeight / 2;
        const targetTop = target.offsetTop;
        return -targetTop + containerHeight - targetHeight * 2;
      },
      scale: 1.6,
      ease: "power4.out",
      duration: 1.5,
    });
    tl.to(`#card${index}`, {
      y: function (_, target, __) {
        const buttonTop = buttonWishRef.current!.offsetTop;
        const targetTop = target.offsetTop;
        return buttonTop - targetTop;
      },
      ease: "power4.out",
      scale: 0.5,
      duration: 1.5,
      opacity: 0,
    });
  }
  function handlePublishWish() {
    alert("发布成功,祝您心想事成");
  }
  useGSAP(() => {
    handleStarBlink();
    animateBoat();
  }, []);
  return (
    <div className="my-wish-container">
      <div className="wish" ref={containerRef}>
        <div className="cards">
          {cardsList.map((item, index) => (
            <div
              className="card"
              id={`card${index}`}
              key={index}
              style={{ backgroundImage: `url(${item.cardImage})` }}
              onClick={() => handleClickCard(index)}
            >
              {item.cardTitle}
            </div>
          ))}
        </div>
        <div
          className="btn-wish"
          ref={buttonWishRef}
          onClick={handlePublishWish}
        ></div>
        {starArray.map((item) => (
          <div className={["star", `star${item}`].join(" ")} key={item}></div>
        ))}
      </div>
    </div>
  );
};
export default memo(MyWish);
