import SampleModel from './sampleModel';
import SqlHelper from '../src/helper/SqlHelper';

// 5件分のデータを作成する。
const models = [];
for (let i = 0; i < 5; i++) {
  const model = new SampleModel();
  models.push(model);
}

// SQLHELPERを使用して、modelsの数の分だけINSERTを作成
const sqlHelper = new SqlHelper();
const queries = models.map((sqlHelper.createUseMap('sample')));
sqlHelper.writeSql(queries, 'sample');

// 実行コマンドは
//  npm run start ./example/sqlSampleCreate