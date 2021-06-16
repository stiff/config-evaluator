const acorn = require('acorn');

const evcon = (src, ctx) => {
  const ast = acorn.parseExpressionAt(src, 0, { ecmaVersion: 2020 });

  const binops = {
    '+': (l, r) => Number(l) + Number(r),
    '-': (l, r) => Number(l) - Number(r),
    '*': (l, r) => Number(l) * Number(r),
    '/': (l, r) => Number(l) / Number(r),
    '==': (l, r) => l == r,
    '===': (l, r) => l === r,

    _unknown(l, r, op) {
      throw new Error("Unknown operator " + op);
    }
  };

  const visitors = {
    ArrayExpression: ({ elements }) =>
      elements.map(evnode),

    BinaryExpression: ({ left, operator, right }) =>
      (binops[operator] || binops._unknown)(evnode(left), evnode(right), operator),

    CallExpression: ({ callee, arguments }) => {
      const fx = evnode(callee);
      if (typeof fx === 'function') {
        return fx.apply(null, arguments.map(evnode));
      } else {
          throw new Error("Cannot call " + callee.name);
      }
    },

    Identifier: ({ name }) => ctx.hasOwnProperty(name) ? ctx[name] : null,

    Literal: ({ value }) => value,

    LogicalExpression: ({ operator, left, right }) => {
      switch (operator) {
        case '||':
          return evnode(left) || evnode(right);
        case '&&':
          return evnode(left) && evnode(right);
        default:
          throw new Error("Unknown operator ", { operator, left, right });
      }
    },

    MemberExpression: ({ object, property }) =>
      evnode(object)[ evnode(property) ],

    ObjectExpression: ({ properties }) =>
      Object.fromEntries(properties.map(({ key, value }) =>
        [key.name || key.value, evnode(value)])),

    ConditionalExpression: ({ test, consequent, alternate }) =>
      evnode(test) ? evnode(consequent) : evnode(alternate),

    UnaryExpression: ({ operator, argument }) => {
      switch (operator) {
        case '-':
          return - evnode(argument);
        default:
          throw new Error("Unknown operator ", { operator, left, right });
      }
    }
  };

  const evnode = (node) => {
    if (visitors[node.type]) {
      return visitors[node.type](node);
    } else {
      console.log({ node })
      throw new Error("Unknown node type " + node.type);
    }
  };

  return evnode(ast);
};

module.exports = {
  evcon
};
