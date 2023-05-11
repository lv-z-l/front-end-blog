---
title: 买卖股票 1
author: lvzl
---

**给定一个数组 prices ，它的第  i 个元素  prices[i] 表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。**
- 示例 1：
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

- 示例 2：
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
- 来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock


```js
// 暴力解法
var maxProfit = function (prices) {
  if (!prices || prices.length === 0) return 0
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = prices.length - 1; j > i; j--) {
      const cha = prices[j] - prices[i];
      if (cha > profit) {
        profit = cha
      }
    }
  }
  return profit < 0 ? 0 : profit;
};

// 动态规划
var maxProfit = function (prices) {
  if (!prices || prices.length === 0) return 0
  let minPrice = Math.max(...prices)
  let maxProfit = 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) minPrice = prices[i]
    const profit = prices[i] - minPrice
    if (profit > maxProfit) maxProfit = profit
  }
  return maxProfit
};
```
