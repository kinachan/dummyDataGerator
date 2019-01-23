
import {converterMap} from '../lib/namingConverterMap';
import creator from '../lib/creator';
import {isObject, isUUID} from '../lib/commonlib';

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

  const convertFunc = converterMap[convertCase];
  const property = convertFunc(key);
  const suffix = '{get; set; }';

  return `${prefix} ${type} ${property} ${suffix}`;
};


const changeModels = (convertCase, obj, fileName = 'exsample.cs') => {
  const lines = [];
    Object.keys(obj).forEach((key) => {
      const line = createLine(convertCase, key, obj[key]);
      lines.push(line);
    });
    creator.writeCSharp(fileName, lines);
};
export default changeModels;