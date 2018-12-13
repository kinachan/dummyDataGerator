const generator = require('../utils/generator');
const fileName = 'yearEndAdjustmentSetting.json';

class DefaultModel {
  constructor(year = null) {
    this.defaultModel = {
      corporationNumber: generator.getRandomPhoneNumber(),
      office: '東京事業所',
      officeKana: 'トウキョウジギョウショ',
      representativeName: '社長の　太郎',
      zipCode: generator.randomByLength(7, 7).toString(),
      prefecture: '東京都',
      city: '文京区',
      town: '本郷三丁目',
      building: 'なんとか６F',
      phoneNumber: generator.getRandomPhoneNumber(),
      lineOfBusiness: 'サービス業',
      accountingPersonName: '経理の　次郎',
      payrollDepartmentName: '経理部',
      payrollPersonName: '給与の　三郎',
      payrollPersonPhoneNumber: generator.getRandomPhoneNumber(),
      accountingFirmName: '明朗会計会計事務所',
      accountingFirmPhoneNumber: generator.getRandomPhoneNumber(),
      bankName: 'みずほ銀行',
      bankAddress: '東京都千代田区千代田１−１',
      taxOfficeName: '新宿税務署',
      paymenMethodAndCloseDate: '月給　２５日払い',
    };
  }
}

const createItem = (year) => {
  const modelClass = new DefaultModel(year);
  const item = Object.assign({}, modelClass.defaultModel);
  return item;
}

const yearEndAdjustmentSettingCreate = () => {
  const result = [];
    for (let year = 2013; year < 2019; year++) {
      const item = createItem(year);
      result.push(item);
    }
  generator.wirteJson(fileName, result);
};

// 実行後、./distにJSONが出力されます。
yearEndAdjustmentSettingCreate();