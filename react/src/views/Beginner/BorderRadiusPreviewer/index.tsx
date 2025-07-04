import { memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Slider } from "antd";
import "./index.scss";
interface AppProps {
  children?: ReactNode;
}
const App: FC<AppProps> = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const initialStyle = {
    borderWidth: 10,
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  };
  const [style, setStyle] = useState(initialStyle);
  async function handelCopy() {
    const styleText = boxRef.current?.style.cssText;
    await navigator.clipboard.writeText(styleText as string);
    alert("Copied to clipboard");
  }
  return (
    <div className="app">
      <div className="box" style={style} ref={boxRef}></div>
      <div className="sliders">
        <div className="border-width">
          <span>边框宽度</span>
          <Slider
            value={style.borderWidth}
            onChange={(value) => setStyle({ ...style, borderWidth: value })}
          ></Slider>
        </div>
        <div className="box-width">
          <span>盒子宽度</span>
          <Slider
            value={style.width}
            onChange={(value) => setStyle({ ...style, width: value })}
          ></Slider>
        </div>
        <div className="box-height">
          <span>盒子高度</span>
          <Slider
            value={style.height}
            onChange={(value) => setStyle({ ...style, height: value })}
          ></Slider>
        </div>
        <div className="box-radius">
          <span>盒子左上圆角</span>
          <Slider
            value={style.borderTopLeftRadius}
            onChange={(value) =>
              setStyle({ ...style, borderTopLeftRadius: value })
            }
          ></Slider>
        </div>
        <div className="box-radius">
          <span>盒子右上圆角</span>
          <Slider
            value={style.borderTopRightRadius}
            onChange={(value) =>
              setStyle({ ...style, borderTopRightRadius: value })
            }
          ></Slider>
        </div>
        <div className="box-radius">
          <span>盒子左下圆角</span>
          <Slider
            value={style.borderBottomLeftRadius}
            onChange={(value) =>
              setStyle({ ...style, borderBottomLeftRadius: value })
            }
          ></Slider>
        </div>
        <div className="box-radius">
          <span>盒子右下圆角</span>
          <Slider
            value={style.borderBottomRightRadius}
            onChange={(value) =>
              setStyle({ ...style, borderBottomRightRadius: value })
            }
          ></Slider>
        </div>
      </div>
      <div className="btns">
        <button onClick={() => setStyle(initialStyle)}>重置</button>
        <button onClick={handelCopy}>复制样式</button>
      </div>
    </div>
  );
};
export default memo(App);
