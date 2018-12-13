const fs = require('fs');
const names = require('../constant/names');

class Generator {
  constructor() {
    this.rootPath = './dist/';
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  formatDate(dt, hasDay = true, joinChar = '-') {
    let month = dt.getMonth() + 1;
    let day = dt.getDate();
    const year = dt.getFullYear().toString();
    if (month.toString().length < 2) month = '0' + month;
    if (day.toString().length < 2) day = '0' + day;

    if (!hasDay) {
      return [year, month].join(joinChar);
    }
    return [year, month, day].join(joinChar);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomToBool() {
    return this.random(0, 1) === 0;
  }

  randomStaffId() {
    return this.random(10000000, 99999999);
  }

  getRandomName() {
    const index = this.random(0, names.length - 1);
    const name = names[index];

    return name;
  }

  randomByLength(minLength, maxLength) {
    const minStrPlusOne = `1${[...Array(minLength)].map((ignore) => '0').join('')}`;
    const maxStrPlusOne = `9${[...Array(maxLength)].map((ignore) => '9').join('')}`;

    const min = parseInt(minStrPlusOne.slice(0, minStrPlusOne.length - 1));
    const max = parseInt(maxStrPlusOne.slice(0, maxStrPlusOne.length - 1));

    return this.random(min, max);
  }

  sortFunc() {
    return (a, b) => {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    }
  }

  /**
   * 正規表現面倒だから適当に11桁の数字を文字列にして返却。
   */
  getRandomPhoneNumber() {
    return this.random(11, 11).toString();
  }


  wirteJson(fileName, obj) {
    const json = JSON.stringify(obj, null, 2);

    const writer = fs.createWriteStream(`${this.rootPath}${fileName}`, 'utf8');
    writer.write(json);
    writer.end();
  }
}

const generator = new Generator();

module.exports = generator;