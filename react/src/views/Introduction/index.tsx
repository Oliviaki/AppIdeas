import { memo } from "react";
import type { FC, ReactNode } from "react";
interface IntroductionProps {
  children?: ReactNode;
}
const Introduction: FC<IntroductionProps> = () => {
  return <div>Introduction</div>;
};
export default memo(Introduction);
