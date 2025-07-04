import { memo } from "react";
import type { FC, ReactNode } from "react";
interface AdvancedProps {
  children?: ReactNode;
}
const Advanced: FC<AdvancedProps> = () => {
  return (
    <div>Advanced</div>
  );
};
export default memo(Advanced);
