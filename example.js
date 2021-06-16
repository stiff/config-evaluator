const { evcon } = require('./index');

const src = `{
    ingredients: [
      { name: 'sugar', amount: sugar },
      { name: 'water', amount: '100' - coffeeratio * 10 },
      { name: 'coffee', amount: clamp(150, 0, 100 + coffeeratio * 30) },
      { name: 'milk', amount: 50, ignore: withmilk == 0 },
      { name: 'powder', amount: 1 * { caraway: 5, cinnamon: 7 }[powder] || 3 },
    ]
  }`;

const ctx = {
  sugar: 3,
  coffeeratio: 2,
  withmilk: 0,
  powder: 'cumin',
  clamp: (min, max, x) => Math.max(min, Math.min(max, x)),
};

console.log(evcon(src, ctx))
