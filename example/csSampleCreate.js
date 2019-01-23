import SampleModel from './sampleModel';
import {CASES} from '../src/lib/namingConverterMap';
import changeModel from '../src/modules/CsConverter';


const model = new SampleModel();

changeModel(CASES.Pascal, model.defaultModel, 'example.cs');

// 実行コマンドは
//  npm run start ./example/csSampleCreate
