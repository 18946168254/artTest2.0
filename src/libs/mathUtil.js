// 随机数工具类

/**
 * 可均衡获取0到9的随机整数。
 * @returns {number}
 */
export const intFrom0To9 = () => {
  return Math.floor(Math.random() * 10)
}
