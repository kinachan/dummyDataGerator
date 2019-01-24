
import {converterMap, CASES} from '../lib/namingConverterMap';
import fileCreator from '../lib/fileCreator';
import {isObject, isUUID} from '../lib/commonlib';
import {getTrackableType} from '../lib/trackableUtil';


class CSharpConveter {
  constructor(fileName, model, ignoreNullValue = true, convertCase = CASES.Pascal) {
    this.fileName = fileName;
    this.model = model;
    this.ignoreNullValue = ignoreNullValue;
    this.convertFunc = converterMap[convertCase];
  }

  getTrackableValues = (key) => {
    return getTrackableType(key);
  }

  getType = (value) => {
    if (isObject(value)) return 'Class';
    if (Array.isArray(value)) return 'List<>';
    if (isUUID(value)) return 'Guid';

    switch (typeof value) {
      case 'string':
        return 'string';
      case 'number':
        return 'int';
      case 'boolean':
        return 'bool';
      default:
    }

    if (this.ignoreNullValue) return null;
    throw `Error args: ${value}`;
  }

  createProperty = (key, value) => {
    const prefix = 'public';
    let type = this.getType(value);
    if (type == null) type = this.getTrackableValues(key);
  
    const property = this.convertFunc(key);
    const suffix = '{get; set; }';
  
    return `${prefix} ${type} ${property} ${suffix}`;
  };

  createProperties = (shouldWriteFile = true) => {
    const lines = [];
      Object.keys(this.model).forEach((key) => {
        const line = this.createProperty(key, this.model[key]);
        lines.push(line);
      });
      if (shouldWriteFile) fileCreator.writeCSharp(this.fileName, lines);
      return lines.join(('\n'));
  };
}
export default CSharpConveter;