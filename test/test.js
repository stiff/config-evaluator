const { evcon } = require("../index");

describe('evaluations', () => {

  it('should do basic arithmetics', () => {
    expect(evcon("10+20", {})).toEqual(30);
  });

  it('should support unary negation literal', () => {
    expect(evcon("10 + (-20)", {})).toEqual(-10);
  });

  it('should support unary negation of context variable', () => {
    expect(evcon("10 + (-x)", { x: -40 })).toEqual(50);
  });

  it('should support numeric maps', () => {
    expect(evcon("{ 10: 100, 20: 200 }[x]", { x: 10 })).toEqual(100);
  });

  it('should support string-keyed maps', () => {
    expect(evcon("{ a: x, b: y }[z]", { x: 5, y: 10, z: 'a' })).toEqual(5);
  });

});
