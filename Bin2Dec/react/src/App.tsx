import { memo, useState } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
interface AppProps {
  children?: ReactNode;
}
const App: FC<AppProps> = () => {
  const [binaryDigit, setBinaryDigit] = useState('');
  const [tips, setTips] = useState('');
  const [answer, setAnswer] = useState('');
  function handleChange(e:ChangeEvent<HTMLInputElement>){
    setBinaryDigit(e.target.value);
    if(isValidBinary(e.target.value)){
      setTips('');
      setAnswer(convertBinaryToDecimal(e.target.value))
      return
    }
    setTips('请输入有效的二进制数')
    setAnswer('')
  }
  return (
    <div className="app-container">
      <input type="text" value={binaryDigit} onChange={handleChange} />
      {binaryDigit.trim() && <span className="tips">{tips}</span>}
      <div className="answer">{answer}</div>
    </div>
  );
};
export default memo(App);
 const reg = /^[0-1]+$/;
function isValidBinary(value: string): boolean {
  return reg.test(value.trim());
}
function convertBinaryToDecimal(binary: string):string{
  return parseInt(binary.trim(), 2).toString()
}