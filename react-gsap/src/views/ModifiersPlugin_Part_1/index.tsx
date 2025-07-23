import { memo } from "react";
import type { FC, ReactNode } from "react";
import Gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./index.scss";
interface ModifiersPlugin_Part_1Props {
  children?: ReactNode;
}
const ModifiersPlugin_Part_1: FC<ModifiersPlugin_Part_1Props> = () => {
  useGSAP(() => {
    Gsap.to(".box", {
      x: 1600,
      y: 360,
      duration: 5,
      modifiers: {
        // y: (value, target) => {
        //   //value为原始计算从0计算到360变化过程中的值，target为当前元素
        //   return Math.sin(parseFloat(value) / 57.296) * 300 + 300 + "px";
        // },

        //或者
        y: Gsap.utils.unitize((value) => {
          return Math.sin(parseFloat(value) / 57.296) * 300 + 300;
        }, "px"),//默认为px
      },
    });
  });
  return (
    <div className="modifiers-plugin-part-1-container">
      <div className="box"></div>
    </div>
  );
};
export default memo(ModifiersPlugin_Part_1);
