import SampleModel from './sampleModel';
import fileCreator from '../src/lib/fileCreator';

const models = [];
for (let i = 0; i < 5; i++) {
  const model = new SampleModel();
  models.push(model);
}

const data = models.map((model => model.data));
fileCreator.writeJson('sample.json', data);
