import {CASES, converterMap} from '../lib/namingConverterMap';
import fileCreator from '../lib/fileCreator';
import {currentTimeStamp} from '../lib/constant/constant';
import {getTrackableValue} from '../lib/trackableUtil';

class SqlCreator {
  constructor(tableName, columns, data, mappingObjects = null, lower = false, toCamelChange = true) {
    this.orignalTablePrefix = 'INSERT INTO';
    this.orignalValuesPrefix = 'VALUES';

    this.tableName = tableName;
    this.columns = columns;
    this.mappingObjects = mappingObjects;
    this.data = data;
    this.tablePrefix = lower ? this.orignalTablePrefix.toLowerCase() : this.orignalTablePrefix;
    this.valuesPrefix = lower ? this.orignalValuesPrefix.toLowerCase() : this.orignalValuesPrefix;
    this.toCamelChange = toCamelChange;
  }

  getQueryValue = (origKey) => {
    let key = origKey;
    if (this.toCamelChange) {
      key = converterMap[CASES.Camel](value);
    }
    let value = key === origKey ? this.data[key] : this.getValueByDiffrentKey(origKey, key);
    if (value == null) value = this.getSpecialValue(key);
    return this.changeValueByType(value);
  }

  changeValueByType = (value) => {
    if (value === currentTimeStamp) return value;
    const type = typeof value;
    switch (type) {
      case 'string':
        return `'${value}'`;
      case 'boolean' :
        return `'${value.toString().slice(0, 1)}'`; 
      default:
        return value;
    }
  }

  getSpecialValue = key => {
    return getTrackableValue(key);
  }

  getValueByDiffrentKey = (originalKey, key) => {
    if (this.mappingObjects == null) return null;
    let dataObj = this.mappingObjects.find(x =>x.key === originalKey);
    if (dataObj == null) {
      dataObj = this.mappingObjects.find(x =>x.key === key);
      if (dataObj == null) return null;
    };
    return this.data[dataObj.value];
  }

  /**
   * shouldWriteFile = true SQLファイルに書き起こすか？
   */
  createQuery = (shouldWriteFile = true) => {
    const insertValues = [];
 
    this.columns.forEach((originalKey) => {
      const value = this.getQueryValue(originalKey);
      insertValues.push(value)
    });
    let query = `${this.tablePrefix} ${this.tableName} (${this.columns.join(', ')}) ${this.valuesPrefix} (${insertValues.join(',')});`;
    if (shouldWriteFile) {
      fileCreator.writeSql(`${this.tableName}.sql`, query);
    }
    return query;
  }
}
export default SqlCreator;