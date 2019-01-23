
class StringFormatter {
  constructor(){

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

  dateToFormatString(date, joinFormat = '/'){
    const numbers = [];
    numbers.push(date.getFullYear().toString());
    numbers.push(("00" + (date.getMonth()+1)).slice(-2));
    numbers.push(("00" + date.getDate()).slice(-2));

    return numbers.join(joinFormat);
  }
  /**
   * キャメルケースへ変換
   */
  toCamelCase(str) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
  }
    
  /**
   * スネークケースへ変換 sample_string
   * @param string
   * @return string
   */
  toSnakeCase(str) {
    const camel = stringFormat.toCamelCase(str);
    return camel.replace(/[A-Z]/g, (s) => {
      return "_" + s.charAt(0).toLowerCase();
    });
  }
  
  
  /**
   * パスカルケースへ変換 SampleString
   * @param string
   * @return string
   */
  toPascalCase(str) {
    const camel = stringFormat.toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }
}

const stringFormat = new StringFormatter();
export default stringFormat;