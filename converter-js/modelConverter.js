
const mapper = require('./casesMapper');

const isObject = any => typeof any === 'object' && any !== null && !Array.isArray(any);
const isUUID = str => /([a-z]|[0-9]){8}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){4}-([a-z]|[0-9]){12}/.test(str);

const convertObject = (key, value) => {
  if (isObject(value)) {
    return 'Class'; // クラス名は手動で指定するしかない？
  }
  if (Array.isArray(value)) {
    return 'List<>';
  }
  throw `Error args: ${value}`;
}

const getType = (key, value) => {
  if (isUUID(value)) return 'Guid';
  switch (typeof value) {
    case 'string':
      return 'string';
    case 'number':
      return 'int';
    case 'boolean':
      return 'bool';
    default:
      return convertObject(key, value);
  }
}

const createLine = (convertCase, key, value) => {
  const prefix = 'public';

  const type = getType(key, value);

  const convertFunc = mapper[convertCase];
  const property = convertFunc(key);
  const suffix = '{get; set; }';

  return `${prefix} ${type} ${property} ${suffix}`;
};


const changeModels = (convertCase, obj) => {
  const lines = [];
    Object.keys(obj).forEach((key) => {
      const line = createLine(convertCase, key, obj[key]);
      lines.push(line);
    });
    const result = lines.join('\n\n');
    console.log(result);
};

module.exports = changeModels;