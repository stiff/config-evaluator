const { evcon } = require('./index');

const src = `{
    ingredients: [
      { name: 'sugar', amount: sugar },
      { name: 'water', amount: 100 - coffeeratio * 10 },
      { name: 'coffee', amount: 100 + coffeeratio * 30 },
      { name: 'milk', amount: 50, ignore: withmilk == 0 },
      { name: 'powder', amount: { caraway: 5, cinnamon: 7 }[powder] },
    ]
  }`;

const ctx = {
  sugar: 3,
  coffeeratio: 2,
  withmilk: 0,
  powder: 'cinnamon',
};

console.log(evcon(src, ctx))
