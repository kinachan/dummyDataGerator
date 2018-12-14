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

  getName(index) {
    const name = names[index];
    return name;
  }

  getRandomName() {
    const index = this.random(0, names.length - 1);
    const name = names[index];

    return name;
  }

  randomByLengthWithZero(length) {
    if (length <= 0 ) throw new Error('must be argumentname ="length" is greater than 0.');
    // 最大文字数分９埋めとします。
    const max = parseInt(''.padStart(length, 9));

    const randomNumber = this.random(0, max);
    return randomNumber.toString().padStart(length, '0');
  }

  sortFunc() {
    return (a, b) => {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    }
  }

  assert(expected, actual) {
    if (expected === actual) return true;
    throw new Error(`assertion is failed expected:${expected} bad actual is ${actual}`);
  }

  /**
   * 正規表現面倒だから東京の電話のみ返却
   */
  getRandomPhoneNumber(withHyphen = false) {
    const phoneNumberPrefix = '03';

    if (!withHyphen) {
      const randomNumber = this.randomByLengthWithZero(8);
      return `${phoneNumberPrefix}${randomNumber}`;
    }
    const cityCode = this.randomByLengthWithZero(4);
    const number = this.randomByLengthWithZero(4);

    return `${phoneNumberPrefix}-${cityCode}-${number}`;
  }


  wirteJson(fileName, obj, rootPath = null) {
    const json = JSON.stringify(obj, null, 2);

    const writer = fs.createWriteStream(`${rootPath || this.rootPath}${fileName}`, 'utf8');
    writer.write(json);
    writer.end();
  }
}

const generator = new Generator();

module.exports = generator;