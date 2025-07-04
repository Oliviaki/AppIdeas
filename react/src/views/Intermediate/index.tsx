import { memo } from "react";
import type { FC, ReactNode } from "react";
interface IntermediateProps {
  children?: ReactNode;
}
const Intermediate: FC<IntermediateProps> = () => {
  return <div>Intermediate</div>;
};
export default memo(Intermediate);
