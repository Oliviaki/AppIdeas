import { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import Gsap from "gsap";
import "./index.scss";
import { useGSAP } from "@gsap/react";
interface EndArrayPluginProps {
  children?: ReactNode;
}
const EndArrayPlugin: FC<EndArrayPluginProps> = () => {
  const array = [-200, 600, 0];
  const [blue, setblue] = useState(array[0]);
  const [green, setgreen] = useState(array[1]);
  const [yellow, setyellow] = useState(array[2]);
  useGSAP(() => {
    Gsap.to(array, {
      endArray: [100, 350, 600],
      duration: 2,
      onUpdate: function () {
        Gsap.to(".blue", { x: array[0] });
        Gsap.to(".green", { x: array[1] });
        Gsap.to(".yellow", { x: array[2] });
        setblue(array[0]);
        setgreen(array[1]);
        setyellow(array[2]);
      },
    });
  }, []);
  return (
    <div className="end-array-plugin-container">
      <div className="blue">{blue}</div>
      <div className="green">{green}</div>
      <div className="yellow">{yellow}</div>
    </div>
  );
};
export default memo(EndArrayPlugin);
