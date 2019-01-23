import {CASES, converterMap} from '../lib/namingConverterMap';
import creator from '../lib/creator';
import * as constant from '../lib/constant/constant';

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
  toCamel(value){
    return converterMap[CASES.Camel](value);
  }

  getValue (origKey) {
    let key = origKey;
    if (this.toCamelChange) {
      key = this.toCamel(origKey);
    }
    let value = this.data[key];
    if (value == null) {
      value = this.getValueByDiffrentKey(origKey, key);
    }
    return this.changeValueByType(key, value);
  }

  changeValueByType(key, value) {
    if (value == null) return this.appendSpecialValue(key, value);
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
  appendSpecialValue(key, value) {
    if (value != null) return value;
  
    const createdOn = this.toCamelChange ? this.toCamel('created_on') : 'created_on';
    const updatedOn = this.toCamelChange ? this.toCamel('updated_on') : 'updated_on';
    const createdBy = this.toCamelChange ? this.toCamel('created_by') : 'created_by';
    const updatedBy = this.toCamelChange ? this.toCamel('updated_by') : 'updated_by';
  
    if (key === createdOn || key === updatedOn) {
      return constant.currentTimeStamp;
    }
    if (key === createdBy || key === updatedBy) {
      return constant.dummyUUID;
    }
    return null;
  }
  getValueByDiffrentKey (originalKey, key) {
    if (this.mappingObjects == null) return null;
    let dataObj = this.mappingObjects.find(x =>x.key === originalKey);
    if (dataObj == null) {
      dataObj = this.mappingObjects.find(x =>x.key === key);
      if (dataObj == null) return null;
    };
  
    return this.data[dataObj.value];
  }
  create(writeSql = true) {
    const columnsString = this.columns.join(', ');
    const array = [];
    const nullList = [];
  
    this.columns.forEach((originalKey, index) => {
      const value = this.getValue(originalKey);
      if (value == null) {
        nullList.push({originalKey, index});
      } else {
        array.push(value)
      }
    });
    let result = `${this.tablePrefix} ${this.tableName} (${columnsString}) ${this.valuesPrefix} (${array.join(',')});`;
    if (writeSql) {
      creator.writeSql(`${this.tableName}.sql`, result);
    }
    if (nullList.length > 0) {
      console.log('マッピングされなかったオブジェクトが見つかりました。');
      console.log(JSON.stringify(nullList, null, 2));
    }
    return result;
  }
}
export default SqlCreator;