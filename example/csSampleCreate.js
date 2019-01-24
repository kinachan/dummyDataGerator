import SampleModel from './sampleModel';
import CsConverter from '../src/modules/CsConverter';


const model = new SampleModel();

const csConverter = new CsConverter('example.cs', model.data);
csConverter.createProperties()

// 実行コマンドは
//  npm run start ./example/csSampleCreate
