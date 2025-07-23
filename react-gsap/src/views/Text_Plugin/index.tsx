import { memo } from "react";
import type { FC, ReactNode } from "react";
import Gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import "./index.scss";
Gsap.registerPlugin(TextPlugin);
interface TextPluginProps {
  children?: ReactNode;
}
const Text_Plugin: FC<TextPluginProps> = () => {
  useGSAP(() => {
    // Gsap.to(".text", {
    //   duration: 10,
    //   delay: 2,
    //   text: {
    //     value: "sbvjsb   jnsfjsbnd s    jsnf",
    //     delimiter: "", //分割字符的符号，默认为""
    //     speed: 0.1, //速度,配置之后duration无效
    //     preserveSpaces: true, //时候保留value中的多余空格
    //     padSpace: true, //value比原字符短时，是否填充空格
    //     type: "difference", //value与原字符不同的地方才会有动画
    //     oldClass: "old", //旧字符的样式
    //     newClass: "new", //新字符的样式
    //   },
    // });
    const textElements = Gsap.utils.toArray(".text") as HTMLDivElement[];
    const tl = Gsap.timeline()
      .set(textElements, { scale: 0 })
      .to(textElements, {
        scale: 1,
        duration: 1,
        stagger: 1,
        delay: 1,
        ease: "elastic.out(2,0.2)",
        onComplete: () => {
          updateText();
        },
      });
    function updateText(index: number = 0) {
      const inverText = ["SATOR", "AREPO", "TENET", "OPERA", "ROTAS"];
      if (index >= inverText.length) return;
      Gsap.to(textElements[index], {
        duration: 2,
        text: {
          value: inverText[index],
        },
        rotationY: 360,
        ease: "elastic.out(1,0.3)",
        color: "#fff",
        textShadow: "0 0 2px #000,0 0 10px #fff",
        onComplete: () => {
          updateText(index + 1);
        },
      });
    }
  });
  return (
    <div className="text-plugin-container">
      <div className="text">ROTAS</div>
      <div className="text">OPERA</div>
      <div className="text">TENET</div>
      <div className="text">AREPO</div>
      <div className="text">SATOR</div>
    </div>
  );
};
export default memo(Text_Plugin);
