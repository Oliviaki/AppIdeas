在JavaScript中，实现进制转换主要有以下几种方法，涵盖了内置函数、自定义转换算法以及特殊场景的处理：


### 一、使用内置函数进行进制转换
#### 1. 其他进制转十进制（`parseInt`）
```javascript
parseInt(string, radix);
```
- **`string`**：要解析的字符串（忽略前导空格，遇到无效字符停止）。
- **`radix`**：进制基数（2-36之间的整数，省略或为0时默认为10）。

**示例**：
```javascript
parseInt('101', 2);    // 5（二进制转十进制）
parseInt('FF', 16);    // 255（十六进制转十进制）
parseInt('2A', 16);    // 42（十六进制中的A=10）
parseInt('077', 8);    // 63（八进制转十进制）
```

#### 2. 十进制转其他进制（`Number.prototype.toString`）
```javascript
num.toString(radix);
```
- **`radix`**：目标进制（2-36之间的整数，默认10）。

**示例**：
```javascript
(255).toString(16);    // "ff"（十进制转十六进制）
(5).toString(2);       // "101"（十进制转二进制）
(63).toString(8);      // "77"（十进制转八进制）
```


### 二、自定义进制转换函数
#### 1. 任意进制转十进制（手动计算）
通过按位加权求和实现：
```javascript
function customParseInt(str, radix) {
  const digits = str.split('');
  let result = 0;
  for (let i = 0; i < digits.length; i++) {
    // 获取字符对应的数值（如 'A' 在十六进制中为 10）
    const charValue = parseInt(digits[i], radix);
    if (isNaN(charValue)) throw new Error('Invalid digit');
    result = result * radix + charValue;
  }
  return result;
}

customParseInt('101', 2);  // 5
```

#### 2. 十进制转任意进制（手动计算）
通过不断取余和整除实现：
```javascript
function decimalToBase(num, radix) {
  if (num === 0) return '0';
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let isNegative = num < 0;
  num = Math.abs(num);

  while (num > 0) {
    const remainder = num % radix;
    result = digits[remainder] + result;
    num = Math.floor(num / radix);
  }

  return isNegative ? '-' + result : result;
}

decimalToBase(255, 16);  // "FF"
decimalToBase(5, 2);     // "101"
```


### 三、特殊场景处理
#### 1. 二进制与十六进制互转
可通过十进制作为中间桥梁：
```javascript
// 二进制 → 十六进制
const binary = '11010110';
const hex = parseInt(binary, 2).toString(16);  // "d6"

// 十六进制 → 二进制
const hexStr = 'FF';
const binaryStr = parseInt(hexStr, 16).toString(2).padStart(8, '0');  // "11111111"
```

#### 2. 处理大数字（超过 `Number.MAX_SAFE_INTEGER`）
使用 `BigInt` 避免精度丢失：
```javascript
// 大二进制数转十进制
const bigBinary = '1'.repeat(100);
const decimal = BigInt(`0b${bigBinary}`).toString();  // "1267650600228229401496703205375"

// 大十进制数转二进制
const bigNum = BigInt('12345678901234567890');
const binary = bigNum.toString(2);  // "10110001010111100001010110010101010001011010101010"
```


### 四、实用技巧
#### 1. 补零处理
转换为固定位数的字符串：
```javascript
const num = 5;
const binary = num.toString(2).padStart(8, '0');  // "00000101"
```

#### 2. 进制前缀（`0b`, `0o`, `0x`）
JavaScript 支持直接解析带前缀的数值：
```javascript
0b101;    // 5（二进制）
0o77;     // 63（八进制）
0xFF;     // 255（十六进制）
```


### 总结
| 场景                | 方法                          | 示例                          |
|---------------------|-------------------------------|-------------------------------|
| 其他进制 → 十进制   | `parseInt(string, radix)`     | `parseInt('101', 2)` → `5`    |
| 十进制 → 其他进制   | `num.toString(radix)`         | `(255).toString(16)` → `"ff"` |
| 任意进制互转        | 通过十进制中转                | 二进制→十六进制：`parseInt(bin, 2).toString(16)` |
| 大数字处理          | 使用 `BigInt`                 | `BigInt('0b1111')` → `15n`   |

根据具体需求选择合适的方法，注意处理边界情况（如空字符串、非法字符、大数字精度等）。