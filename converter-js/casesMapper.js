const cases = require('./cases');
const converter = require('./converterModules');

const converterMap = {
  [cases.camel]: converter.camelCase,
  [cases.snake]: converter.snakeCase,
  [cases.pascal]: converter.pascalCase,
};

module.exports = converterMap;