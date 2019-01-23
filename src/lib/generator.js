import uuid from 'uuid/v4';
import stringFormat from './stringFormat';
import {names} from './constant/dummyNames';

class Generator {
  guid() {
    return uuid();
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
  /**
   * 
   * @param {*} min 例：1980-1-1
   * @param {*} max  例：1985-12-31
   */
  getRandomDate(min, max, joinFormat = '/') {
    const minTime = new Date(min).getTime();
    const maxTime = new Date(max).getTime();
    
    const num = this.random(minTime, maxTime);
    const date = new Date(num);
    return stringFormat.dateToFormatString(date, joinFormat);
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
}

const generator = new Generator();
export default generator;