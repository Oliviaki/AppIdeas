import { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import Gsap from "gsap";
import { EasePack } from "gsap/EasePack";
import { useGSAP } from "@gsap/react";
import "./index.scss";
Gsap.registerPlugin(EasePack);
interface ExpoScaleEaseProps {
  children?: ReactNode;
}
type ImageModule = { default: string };
type ImageModuleLoader = () => Promise<ImageModule>;
type GlobbedImages = Record<string, ImageModuleLoader>;
const ExpoScaleEase: FC<ExpoScaleEaseProps> = () => {
  const [images, setImages] = useState<string[]>([]);
  async function loadImages() {
    const imageModules = import.meta.glob(
      "@/views/ExpoScaleEase/img/*.jpg"
    ) as GlobbedImages;
    const imageUrls = await Promise.all(
      Object.values(imageModules).map(async (loader) => {
        const module = await loader();
        return module.default;
      })
    );
    const sortedImages = sortImagesByNumber(imageUrls);
    setImages(sortedImages);
  }

  function sortImagesByNumber(images: string[]): string[] {
    return images.sort((a, b) => {
      const regex = /\/(\d+)\.jpg$/;
      const matchA = a.match(regex);
      const matchB = b.match(regex);

      // 确保匹配成功并转换为数字
      const numA = matchA ? parseInt(matchA[1], 10) : 0;
      const numB = matchB ? parseInt(matchB[1], 10) : 0;

      return numA - numB;
    });
  }

  useGSAP(() => {
    const imageElements = Gsap.utils.toArray(".image") as HTMLElement[];
    const tl = Gsap.timeline({ repeat: 0 });

    imageElements.forEach((imageElement, index) => {
      if (index === 0 || !imageElement) return;
      tl.to(imageElements[index - 1], {
        scale: 4,
        ease: "expoScale(1,4)",
        duration: 1,
      }).set(imageElements[index - 1], { visibility: "hidden" });
      tl.to(
        imageElement,
        {
          scale: 2,
          ease: "expoScale(1,2)",
          autoAlpha: 1,
          duration: 1,
        },
        "-=1"
      );
    });
  }, [images]);
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div className="expo-scale-ease-container">
      <div className="content">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className="image"
          />
        ))}
      </div>
    </div>
  );
};
export default memo(ExpoScaleEase);
