const converterModules = {
  /**
   * キャメルケースへ変換
   */
  camelCase: (str) => {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
  },
    
  /**
   * スネークケースへ変換 sample_string
   * @param string
   * @return string
   */
  snakeCase: (str) => {
    var camel = converterModules.camelCase(str);
    return camel.replace(/[A-Z]/g, (s) => {
      return "_" + s.charAt(0).toLowerCase();
    });
  },
  
  
  /**
   * パスカルケースへ変換 SampleString
   * @param string
   * @return string
   */
  pascalCase: (str) => {
    var camel = converterModules.camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }
}

module.exports = converterModules;