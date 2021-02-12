# Config Evaluator

Simple module to safely evaluate javascript-like expressions. Useful for user-editable little pieces of dynamic logic stored in database.

## Installation

``` npm install @vstiff/config-evaluator ```

## Usage

``` evcon(expr, ctx) ``` will return result of evaluation of given expression.


### Example

 ```js
 const { evcon } = require('@vstiff/config-evaluator');

const expr = `{
    ingredients: [
      { name: 'sugar', amount: sugar },
      { name: 'water', amount: 100 - coffeeratio * 10 },
      { name: 'coffee', amount: 100 + coffeeratio * 30 },
      { name: 'milk', amount: 50, ignore: withmilk == 0 }
    ]
  }`;

const ctx = {
  sugar: 3,
  coffeeratio: 2,
  withmilk: 0
};

console.log(evcon(expr, ctx))

// {
//   ingredients: [
//     { name: 'sugar', amount: 3 },
//     { name: 'water', amount: 80 },
//     { name: 'coffee', amount: 160 },
//     { name: 'milk', amount: 50, ignore: true }
//   ]
// }

 ```
