const { evcon } = require('./index');

const src = `{
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

console.log(evcon(src, ctx))
