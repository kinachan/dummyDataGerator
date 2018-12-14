const generator = require('../utils/generator');
const fileName = 'yearEndAdjustmentSetting.json';
const CreateItemHelper = require('../modules/createHelper');

const nameMap = {
  2013: 1,
  2014: 2,
  2015: 3,
  2016: 4,
  2017: 5,
  2018: 6,
}

class DefaultModel {
  constructor(year = null) {
    const name = generator.getName(nameMap[year]);
    this.defaultModel = {
      id: year.toString(),
      corporationNumber: generator.randomByLengthWithZero(13),
      office: '東京事業所',
      officeKana: 'トウキョウジギョウショ',
      representativeName: name.name,
      zipCode: generator.randomByLengthWithZero(7),
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

const yearEndAdjustmentSettingCreate = () => {
  const result = [];
    for (let year = 2013; year < 2019; year++) {
      const helper = new CreateItemHelper(DefaultModel, [year]);
      result.push(helper.createObjectItem());
    }
  generator.wirteJson(fileName, result);
};

// 実行後、./distにJSONが出力されます。
yearEndAdjustmentSettingCreate();


